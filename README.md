
# C# Ajax File Upload User Control

### Overview
 
This repo contains a standalone C# user control for adding Ajax file upload fields with progress bars to your web form. It contains 
a Visual Studio .NET (2012) solution with all the files. It was developed on .NET 4.5, but should run on 4.0 as well.

The control uses LPology's excellent [Simple-Ajax-Uploader](https://github.com/LPology/Simple-Ajax-Uploader) repo, which handles
the bulk of the client-side work. The tool downgrades nicely for IE9 and below, which don't support file uploads via Ajax.
For those browsers, a hidden iframe is automatically generated, to which the files are posted.


### Options

- Lets you add one or more file upload components to your form. Each
- Each


### How it works

There are two main classes: `FileUploadField` and `FileUploader`. The former is a user control, which can be included in your
own


### Browser compatibility


### Demo
Check out the `Default.aspx` file for a working demo. That illustrates how you can include the file uploader user
control in your own aspx pages.


### How to Use

### Things you'll want to customize

###License 

MIT. See license.se