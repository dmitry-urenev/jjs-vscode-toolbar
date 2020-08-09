yarn package
code --uninstall-extension dmitry-urenev.quick-vscode-toolbar
code --install-extension quick-vscode-toolbar-0.0.4.vsix
rm -rf ~/.local/share/code-server/extensions/dmitry-urenev.quick-vscode-toolbar-0.0.4
cp -r  ~/.vscode/extensions/dmitry-urenev.quick-vscode-toolbar-0.0.4 ~/.local/share/code-server/extensions/
sudo systemctl restart code-server