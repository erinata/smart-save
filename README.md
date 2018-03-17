# Smart Save

Make saving untitled buffer behaves like Sublime Text.

## Basics

The default behavior of "Save As" in Atom editor is really annoying. It saves the file at the root of the project. Instead, the Smartsave package will set the path of an unsaved buffer according to the path of the last file the editor was focusing on. This behavior is inspired by Sublime Text editor. Of course there should still be glitches but I try to mimic the behavior as close as possible.


## Default Keymap

By default this package will override the original keymap for "save" and "save as"( "cmd+s" and "shift+cmd+s"). You can remap the keymap if you need the original "save" and "save as".
