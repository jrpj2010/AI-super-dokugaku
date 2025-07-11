<script lang="ts">
  import { onMount } from 'svelte';
  import { invoke } from '@tauri-apps/api/core';
  import { open } from '@tauri-apps/plugin-dialog';
  
  interface FileEntry {
    name: string;
    path: string;
  }
  
  let files: FileEntry[] = [];
  let selectedFile: FileEntry | null = null;
  let preview: string = '';
  let loading = false;
  let currentDirectory = '';
  
  async function selectFolder() {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
      });
      
      if (selected) {
        currentDirectory = selected as string;
        await loadFiles();
      }
    } catch (error) {
      console.error('フォルダ選択エラー:', error);
    }
  }
  
  async function loadFiles() {
    if (!currentDirectory) return;
    
    loading = true;
    try {
      files = await invoke<FileEntry[]>('list_markdown_files', { 
        directory: currentDirectory 
      });
    } catch (error) {
      console.error('ファイル読み込みエラー:', error);
    } finally {
      loading = false;
    }
  }
  
  async function selectFile(file: FileEntry) {
    selectedFile = file;
    loading = true;
    try {
      preview = await invoke<string>('parse_markdown', { 
        filePath: file.path 
      });
    } catch (error) {
      console.error('マークダウン解析エラー:', error);
      preview = '<p>エラー: ファイルを読み込めませんでした</p>';
    } finally {
      loading = false;
    }
  }
  
  onMount(() => {
    // 初期化時の処理
  });
</script>

<main>
  <div class="container">
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>ファイル一覧</h2>
        <button class="folder-btn" on:click={selectFolder}>
          フォルダを選択
        </button>
      </div>
      
      {#if currentDirectory}
        <div class="current-dir">
          📁 {currentDirectory.split('/').pop()}
        </div>
      {/if}
      
      <div class="file-list">
        {#if loading && files.length === 0}
          <div class="loading">読み込み中...</div>
        {:else if files.length === 0}
          <div class="empty">
            マークダウンファイルがありません
          </div>
        {:else}
          {#each files as file}
            <div 
              class="file-item"
              class:active={selectedFile?.path === file.path}
              on:click={() => selectFile(file)}
              on:keydown={(e) => e.key === 'Enter' && selectFile(file)}
              role="button"
              tabindex="0"
            >
              📄 {file.name}
            </div>
          {/each}
        {/if}
      </div>
    </div>
    
    <div class="preview">
      {#if loading && selectedFile}
        <div class="loading">読み込み中...</div>
      {:else if selectedFile}
        <div class="preview-header">
          <h2>{selectedFile.name}</h2>
        </div>
        <div class="preview-content">
          {@html preview}
        </div>
      {:else}
        <div class="empty-preview">
          <p>ファイルを選択してください</p>
        </div>
      {/if}
    </div>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #f5f5f5;
  }
  
  main {
    height: 100vh;
    overflow: hidden;
  }
  
  .container {
    display: flex;
    height: 100%;
  }
  
  .sidebar {
    width: 300px;
    background-color: #fafafa;
    border-right: 1px solid #e0e0e0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .sidebar-header {
    padding: 16px;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .sidebar-header h2 {
    margin: 0 0 12px 0;
    font-size: 18px;
    font-weight: 600;
  }
  
  .folder-btn {
    width: 100%;
    padding: 8px 16px;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
  }
  
  .folder-btn:hover {
    background-color: #1976d2;
  }
  
  .current-dir {
    padding: 8px 16px;
    font-size: 12px;
    color: #666;
    background-color: #f0f0f0;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .file-list {
    flex: 1;
    overflow-y: auto;
  }
  
  .file-item {
    padding: 12px 16px;
    cursor: pointer;
    font-size: 14px;
    border-bottom: 1px solid #f0f0f0;
    transition: background-color 0.1s;
  }
  
  .file-item:hover {
    background-color: #f5f5f5;
  }
  
  .file-item.active {
    background-color: #e3f2fd;
    color: #1976d2;
  }
  
  .preview {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: white;
  }
  
  .preview-header {
    padding: 16px 24px;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .preview-header h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }
  
  .preview-content {
    flex: 1;
    overflow-y: auto;
    padding: 24px 32px;
  }
  
  .empty-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #999;
  }
  
  .loading, .empty {
    padding: 16px;
    text-align: center;
    color: #666;
  }
  
  /* マークダウンプレビューのスタイル */
  .preview-content :global(h1) {
    font-size: 28px;
    margin: 24px 0 16px 0;
  }
  
  .preview-content :global(h2) {
    font-size: 24px;
    margin: 20px 0 12px 0;
  }
  
  .preview-content :global(h3) {
    font-size: 20px;
    margin: 16px 0 8px 0;
  }
  
  .preview-content :global(p) {
    line-height: 1.6;
    margin: 12px 0;
  }
  
  .preview-content :global(code) {
    background-color: #f5f5f5;
    padding: 2px 4px;
    border-radius: 3px;
    font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
    font-size: 14px;
  }
  
  .preview-content :global(pre) {
    background-color: #f5f5f5;
    padding: 16px;
    border-radius: 4px;
    overflow-x: auto;
    margin: 16px 0;
  }
  
  .preview-content :global(pre code) {
    background-color: transparent;
    padding: 0;
  }
  
  .preview-content :global(blockquote) {
    border-left: 4px solid #e0e0e0;
    margin: 16px 0;
    padding-left: 16px;
    color: #666;
  }
  
  .preview-content :global(table) {
    border-collapse: collapse;
    width: 100%;
    margin: 16px 0;
  }
  
  .preview-content :global(th), 
  .preview-content :global(td) {
    border: 1px solid #e0e0e0;
    padding: 8px 12px;
    text-align: left;
  }
  
  .preview-content :global(th) {
    background-color: #f5f5f5;
    font-weight: 600;
  }
  
  .preview-content :global(ul), 
  .preview-content :global(ol) {
    margin: 12px 0;
    padding-left: 24px;
  }
  
  .preview-content :global(li) {
    margin: 4px 0;
    line-height: 1.6;
  }
  
  .preview-content :global(a) {
    color: #2196f3;
    text-decoration: none;
  }
  
  .preview-content :global(a:hover) {
    text-decoration: underline;
  }
  
  .preview-content :global(img) {
    max-width: 100%;
    height: auto;
  }
  
  .preview-content :global(hr) {
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 24px 0;
  }
</style>
