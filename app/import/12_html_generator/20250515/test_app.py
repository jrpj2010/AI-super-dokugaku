"""
HTML Generator App のテストスイート
"""
import os
import json
import pytest
from unittest.mock import patch, MagicMock
from app import app


@pytest.fixture
def client():
    """テスト用のFlaskクライアントを作成"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


@pytest.fixture
def mock_env(monkeypatch):
    """環境変数のモック"""
    monkeypatch.setenv('ANTHROPIC_API_KEY', 'test-api-key')


class TestBasicRoutes:
    """基本的なルートのテスト"""
    
    def test_index_route(self, client):
        """インデックスページのテスト"""
        response = client.get('/')
        assert response.status_code == 200
        # HTMLが返されることを確認
        assert b'<!DOCTYPE html>' in response.data or b'<html' in response.data
    
    def test_wysiwyg_route(self, client):
        """WYSIWYGエディターページのテスト"""
        response = client.get('/wysiwyg')
        assert response.status_code == 200
    
    def test_manual_route(self, client):
        """マニュアルページのテスト"""
        response = client.get('/manual')
        assert response.status_code == 200


class TestGenerateEndpoint:
    """HTML生成エンドポイントのテスト"""
    
    def test_generate_missing_data(self, client, mock_env):
        """必須データが欠けている場合のテスト"""
        response = client.post('/generate',
                             data=json.dumps({}),
                             content_type='application/json')
        assert response.status_code == 400 or response.status_code == 500
    
    @patch('anthropic.Anthropic')
    def test_generate_success(self, mock_anthropic, client, mock_env):
        """正常なHTML生成のテスト"""
        # モックレスポンスの設定
        mock_client = MagicMock()
        mock_anthropic.return_value = mock_client
        mock_response = MagicMock()
        mock_response.content = [MagicMock(text='<h1>Generated HTML</h1>')]
        mock_client.messages.create.return_value = mock_response
        
        # リクエストデータ
        data = {
            'system_prompt': 'You are an HTML generator',
            'user_prompt': 'Generate a simple HTML page',
            'use_thinking': False,
            'use_web_search': False
        }
        
        response = client.post('/generate',
                             data=json.dumps(data),
                             content_type='application/json')
        
        assert response.status_code == 200
        json_data = json.loads(response.data)
        assert json_data['success'] is True
        assert json_data['html'] == '<h1>Generated HTML</h1>'
    
    @patch('anthropic.Anthropic')
    def test_generate_with_thinking(self, mock_anthropic, client, mock_env):
        """Thinkingモード有効時のテスト"""
        # モックレスポンスの設定
        mock_client = MagicMock()
        mock_anthropic.return_value = mock_client
        mock_response = MagicMock()
        mock_response.content = [MagicMock(text='<h1>Thoughtful HTML</h1>')]
        mock_client.messages.create.return_value = mock_response
        
        # リクエストデータ
        data = {
            'system_prompt': 'You are an HTML generator',
            'user_prompt': 'Generate a complex HTML page',
            'use_thinking': True,
            'use_web_search': False
        }
        
        response = client.post('/generate',
                             data=json.dumps(data),
                             content_type='application/json')
        
        assert response.status_code == 200
        json_data = json.loads(response.data)
        assert json_data['success'] is True
        
        # Thinkingモードのパラメータが設定されていることを確認
        call_kwargs = mock_client.messages.create.call_args[1]
        assert 'thinking' in call_kwargs
        assert call_kwargs['temperature'] == 1.0
    
    @patch('anthropic.Anthropic')
    def test_generate_api_error(self, mock_anthropic, client, mock_env):
        """API呼び出しエラーのテスト"""
        # エラーを発生させる
        mock_client = MagicMock()
        mock_anthropic.return_value = mock_client
        mock_client.messages.create.side_effect = Exception('API Error')
        
        data = {
            'system_prompt': 'You are an HTML generator',
            'user_prompt': 'Generate HTML',
            'use_thinking': False,
            'use_web_search': False
        }
        
        response = client.post('/generate',
                             data=json.dumps(data),
                             content_type='application/json')
        
        assert response.status_code == 500
        json_data = json.loads(response.data)
        assert json_data['success'] is False
        assert 'error' in json_data


class TestEnvironmentVariables:
    """環境変数のテスト"""
    
    def test_missing_api_key(self):
        """APIキーが設定されていない場合のテスト"""
        with patch.dict(os.environ, {}, clear=True):
            # app.pyを再インポートしてエラーを確認
            with pytest.raises(RuntimeError) as exc_info:
                import importlib
                import app as app_module
                importlib.reload(app_module)
            assert 'ANTHROPIC_API_KEY' in str(exc_info.value)


if __name__ == '__main__':
    pytest.main([__file__, '-v'])