export const Html = (app,serverData)=> `
<html>

<head>
<script>
    // Making SSR indicator to false while application run on CSR.
    window.__isSSR = false; 
    var serverData = JSON.parse('${serverData}');
</script>
</head>
<body>

<div id="container">
${app}
</div>
<script src="./dist/vendor.bootstrap.js" type="text/javascript"></script>
<script src="./dist/bootstrap.js" type="text/javascript"></script>
</body>
</html>
`
