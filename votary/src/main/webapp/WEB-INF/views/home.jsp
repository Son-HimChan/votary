<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Home</title>
</head>
<body>
<h1>
	Hello world!  
</h1>
<button id="btnRefresh" onclick="javascript:refresh();">받아보까</button>
<P>  The time on the server is ${serverTime}. </P>
</body>
</html>
<script>
refresh = function(){
	alert("흠");
}
</script>
