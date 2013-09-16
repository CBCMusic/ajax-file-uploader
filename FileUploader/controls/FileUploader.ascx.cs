using System;
using System.IO;
using System.Web;
using System.Linq;

namespace FileUploader.controls
{
    public partial class FileUploader : System.Web.UI.UserControl
    {
        public string UploadFolderPath = "c:\\Projects\\FileUploaderSln\\FileUploader\\upload2s\\";
        public string AllowedExtensions;

        protected void Page_Load(object sender, EventArgs e)
        {
            // check required fields
            if (String.IsNullOrEmpty(AllowedExtensions))
            {
                throw new Exception("AllowedExtensions is a required attribute for the FileUploader component.");
                return;
            }

            HttpFileCollection uploadFiles = Request.Files;
            HttpPostedFile postedFile = uploadFiles.Get(0);

            // access the uploaded file's content in-memory
            System.IO.Stream inStream = postedFile.InputStream;
            byte[] fileData = new byte[postedFile.ContentLength];
            inStream.Read(fileData, 0, postedFile.ContentLength);

            // specify the path where we're going to save the uploaded file
            string fileName = new FileInfo(postedFile.FileName).Name; // this prevents the full path being returned with IE
            string pathToCheck = UploadFolderPath + fileName;

            // check the extension. This shouldn't fail, if the client-side portion was set up properly
            // to whitelist the same extensions
            string extension = System.IO.Path.GetExtension(fileName).ToLowerInvariant();
            extension = extension.Substring(1); // bizarrely, the above function returns the dot + extension
            string[] validExtensions = AllowedExtensions.Split(',');

            if (!validExtensions.Contains(extension))
            {
                // this could also maybe return the info to the client
                throw new Exception("Invalid file extension: " + extension);
            }
            else
            {
                // some additional logic to prevent filename collisions
                if (System.IO.File.Exists(pathToCheck))
                {
                    string tempfileName = "";
                    int counter = 2;
                    while (System.IO.File.Exists(pathToCheck))
                    {
                        tempfileName = counter.ToString() + fileName;
                        pathToCheck = UploadFolderPath + tempfileName;
                        counter++;
                    }
                    fileName = tempfileName;
                }

                // save the frickin' file already
                postedFile.SaveAs(UploadFolderPath + fileName);

                // we have to output the name plain-text because older IE can't handle the JSON headers for
                // iframe-uploaded files
                Response.Clear();
                Response.ContentType = "text/plain";
                Response.Write("filename:" + fileName);
                Response.End();
            }
        }
    }
}

