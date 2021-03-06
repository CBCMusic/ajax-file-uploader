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

### Screenshot
![Example](http://www.formtools.org/external/example2.png "Example")

### Features
- Lets you add any number of file upload fields to your pages (not necessarily in a form).
- max file sizes as customizable (on both client and server) and permitted file types to be uploaded.
- shows a progress bar (CSS) to the user, or downgrades nicely to a simple loading swirly icon (IE9 and below).
- lets you abort an upload before it's complete.
- optional additional data can to be sent along with the file upload request.
- Provides simple client-side validation for the user to (and throws errors on the server).
- Filename collision detection included (C#).

### How it works
There are two classes: `FileUploadField` and `FileUploader`. The former is a user control, which, when included in your
page will output the necessary markup and javascript; the latter handles the actual form POSTs, moves the file to the
appropriate location on the server, performs validation and checks for filename collisions, and returns the new filename
for inclusion in a form post (or whatever you want).

### How to use

To get it going, do the following:

1. Update `/FileUploader/controls/FileUploader.ascx.cs` for the appropriate default upload folder in your environment.
This can be customized for each particular file upload field / form, but having a default can be handy.
2. Update `/FileUploader/controls/FileUploadField.ascx.cs` for the default uploader aspx file. In the source code, it defaults
to `/process/AudioUpload.aspx`. The idea here is that each unique configuration for upload has it's own aspx file where
the file uploads are posted to. That allows you to
3. Add the `<cbc:FileUploadField />` user control to your form/page. See the example `Default.aspx` file for an example
of how that works.

### Demo
Check out the `Default.aspx` file for a working demo. That illustrates how you can include the file uploader user
control in your own aspx pages.

### Things you'll probably want to customize
- With our own use of this script, we don't just blindly upload the file to a folder (certainly not one that's publicly
accessible). So you may find that either moving the file to a temporary location may be in order, or adding MIME-type
validation into the C#. This was unnecessary for our purposes (but we'd appreciate the code, if you add it!)
- The CSS and JS is really pretty straightforward. Edit away.

### Other notes
- I had to make a small change to [Simple-Ajax-Uploader](https://github.com/LPology/Simple-Ajax-Uploader) to allow
for the abort() function. Other than that it's right out the box. It's an older version, but works perfectly so far.
- IE 9 and early SUCK. I know I'm not saying anything earth-shatteringly new there, but I found I had to return the
new filename in plain text, rather than JSON because IE would choke. Hence the elaborate checking in the JS for
/^filename:/.
- I'm relatively new to C# so was surprised there wasn't a way to detect whether a user control was already
included in the page. Since I wanted the user control to be self-contained, I included external CSS + JS there, however,
naturally I only wanted them to be included once. That's why the optional `OmitIncludes` attribute for the `FileUploadField`
control exists. Doesn't hurt to omit it - browsers will only ever download the identical resource once - but for people
as anal as myself it's nice to have the option. :)
- During our own implementation of this script, we ran into a problem with old IE when the iframe document belonged to a
different domain than the parent. Ordinarily this shouldn't occur, but in our setup we were explicitly changing the domain
for a reason I won't get into. To get around it, I had to alter the response from the FileUploader to return HTML, with
a JS snipped that set the domain to the appropriate value. I decided not to include that fix in this repo because it's
kludgy and I doubt it would be of any use to many people.


###License 
MIT. See license.txt in this folder.

- Ahmed Khalil, design
- Ben Keen, code [@vancouverben](https://twitter.com/vancouverben)