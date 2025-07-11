use tauri::Manager;
use pulldown_cmark::{Parser, Options, html};
use std::fs;
use walkdir::WalkDir;

#[derive(serde::Serialize)]
struct FileEntry {
    name: String,
    path: String,
}

#[tauri::command]
fn list_markdown_files(directory: String) -> Result<Vec<FileEntry>, String> {
    let mut files = Vec::new();
    
    for entry in WalkDir::new(&directory)
        .max_depth(5)
        .into_iter()
        .filter_map(|e| e.ok())
    {
        let path = entry.path();
        if path.is_file() && path.extension().and_then(|s| s.to_str()) == Some("md") {
            if let Some(file_name) = path.file_name().and_then(|s| s.to_str()) {
                files.push(FileEntry {
                    name: file_name.to_string(),
                    path: path.to_string_lossy().to_string(),
                });
            }
        }
    }
    
    files.sort_by(|a, b| a.name.cmp(&b.name));
    Ok(files)
}

#[tauri::command]
fn parse_markdown(file_path: String) -> Result<String, String> {
    let content = fs::read_to_string(&file_path)
        .map_err(|e| format!("ファイルの読み込みに失敗しました: {}", e))?;
    
    let mut options = Options::empty();
    options.insert(Options::ENABLE_TABLES);
    options.insert(Options::ENABLE_FOOTNOTES);
    options.insert(Options::ENABLE_STRIKETHROUGH);
    options.insert(Options::ENABLE_TASKLISTS);
    
    let parser = Parser::new_ext(&content, options);
    let mut html_output = String::new();
    html::push_html(&mut html_output, parser);
    
    Ok(html_output)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(all(desktop))]
            {
                app.handle().plugin(tauri_plugin_single_instance::init(|_app, _args, _cwd| {
                    let _ = _app.get_webview_window("main").map(|w| w.show());
                }))?;
            }
            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            list_markdown_files,
            parse_markdown
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}