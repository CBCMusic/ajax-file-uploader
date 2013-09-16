<%@ Page Language="C#" %>
<%@ Register src="../controls/FileUploader.ascx" tagname="FileUploader" tagprefix="cbc" %>

<%-- 
    Here's where we specify any server-side configurations for the file uploader. For audio,
    we permit the following extensions only: mp3
--%>
<cbc:FileUploader ID="FileUploader1" runat="server" AllowedExtensions="mp3" />