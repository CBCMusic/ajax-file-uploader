# C# Ajax File Upload User Control

### Overview
 
This repo contains a standalone C# user control for adding Ajax file upload fields with progress bars to your web form. It
contains a Visual Studio .NET (2012) solution with all the necessary files. It was developed on .NET 4.5, but should run on
4.0 as well.

The control uses LPology's excellent [Simple-Ajax-Uploader](https://github.com/LPology/Simple-Ajax-Uploader) repo, which handles
the bulk of the client-side work. The tool downgrades nicely for IE9 and below, which don't support Ajax file uploads.
For those browsers, a hidden iframe is automatically generated, to which the files are posted. Showing a progress bar for
the older IE browsers isn't currently supported, so a loading swirly icon appears instead (note: this can be added, however -
see the [Simple-Ajax-Uploader](https://github.com/LPology/Simple-Ajax-Uploader) for info on that).

The motivation for this library was that we needed a new, up to date library to handle simple file uploads. NeatUpload was
no longer supported and all other solutions we looked into were too pricey or didn't fit the bill. The key requirement was
that it showed a progress bar to the user to clearly show them what was happening.


### Features

- Lets you any number of file upload fields to your pages (not necessarily in a form)
- max file sizes as customizable (on both client and server) and permitted file types to be uploaded.
- shows a progress bar (CSS) to the user, or downgrades nicely to a simple loading swirly icon (IE9 and below)
- lets you abort an upload before it's complete
-
- optional additional data can to be sent along with the file upload request
- Provides simple client-side validation for the user to (and throws errors on the server)



### How it works

There are two classes: `FileUploadField` and `FileUploader`. The former is a user control, which, when included in your
page will output the necessary markup and javascript. The second `FileUploader` class i



### Browser compatibility

Any modern browser.


### Demo
Check out the `Default.aspx` file for a working demo. That illustrates how you can include the file uploader user
control in your own aspx pages.


### How to Use






### Things you'll want to customize



### Other notes
I had to make a small change to [Simple-Ajax-Uploader](https://github.com/LPology/Simple-Ajax-Uploader) to allow
for the abort



###License 

MIT. See license.txt in this folder.