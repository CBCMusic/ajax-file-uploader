<%@ Page Language="C#" %>
<%@ Register Src="~/controls/FileUploadField.ascx" TagPrefix="cbc" TagName="FileUploadField" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>File Uploader examples</title>
</head>
<body>  

    <h1>File Upload Tests</h1>

    <p>
        Upload images only: <b>gif, png, png</b>.
    </p>
    
    <cbc:FileUploadField runat="server" id="FileUploader" AllowedExtensions="mp3,gif,png" FormFieldName="exampleField1" />
    
    <div style="height: 8px"> </div>

    <cbc:FileUploadField runat="server" id="FileUploader2" AllowedExtensions="mp3" FormFieldName="exampleField2" 
        OmitIncludes="true" MaxFileSize="100" />
    
    <div style="height: 8px"> </div>

    <cbc:FileUploadField runat="server" id="FileUploader3" AllowedExtensions="jpg,png,gif" FormFieldName="exampleField3" 
        OmitIncludes="true" />

    <div style="height: 8px"> </div>
    
    <cbc:FileUploadField runat="server" id="FileUploader4" AllowedExtensions="mp3" FormFieldName="exampleField4" 
        OmitIncludes="true" ExtraData="artistId: 100" />
    
</body>
</html>