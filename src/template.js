export const headHtml = (serverData) =>`<html>

<head>
<script>
    // Making SSR indicator to false while application run on CSR.
    window.__isSSR = false; 
    var serverData = JSON.parse('${serverData}');
</script>
</head>
<body>
<div id="container">`;

export const tailHtml =`</div>
<script src="./dist/vendor.bootstrap.js" type="text/javascript"></script>
<script src="./dist/bootstrap.js" type="text/javascript"></script>
</body>
</html>`

export const Html = (app,serverData)=> `${headHtml(serverData)}
${app}${tailHtml}
`

