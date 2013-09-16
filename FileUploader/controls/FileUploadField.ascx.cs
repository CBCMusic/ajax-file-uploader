using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace FileUploader.controls
{
    public partial class FileUploadField : System.Web.UI.UserControl
    {
        public int FileSize { get; set; }
        public string GUID;
        public bool OmitIncludes { get; set; }
        public string UploadUrl { get; set; }
        public int MaxFileSize { get; set; }
        public string Debug { get; set; }
        public string ExtraData { get; set; }

        // required fields
        public string AllowedExtensions { get; set; }
        public string AllowedExtensionsJsArray;
        public string FormFieldName { get; set; }

        public FileUploadField()
        {
            // the default upload path. This (and any other) wrapper aspx files place certain restrictions on 
            // the upload content
            UploadUrl = "/process/UploadAudio.aspx";

            FileSize = 1024000;
            GUID = System.Guid.NewGuid().ToString();
            OmitIncludes = false;
            MaxFileSize = 1024000; // 10MB? Err... check this out.
            Debug = "false";
        }

        protected override void OnInit(EventArgs e)
        {
            // check the required attributes have been defined (AllowedExtensions, FormFieldName)
            if (String.IsNullOrEmpty(AllowedExtensions))
            {
                throw new Exception("AllowedExtensions is a required attribute for the FileUploadField component.");
            }
            if (String.IsNullOrEmpty(FormFieldName))
            {
                throw new Exception("FormFieldName is a required attribute for the FileUploadField component.");
            }

            // Note: should always validate that FormFieldName is a valid string, so just don't be silly with it

            // ensure that all extensions are wrapped in single quote for the JS array
            if (!String.IsNullOrEmpty(AllowedExtensions))
            {
                AllowedExtensionsJsArray = "'" + AllowedExtensions.Replace(",", "','") + "'";
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {

        }
    }
}