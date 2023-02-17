## Utilisation :

Utiliser le code en bas de page HTML avant la balise fermante </body> 

- Version locale :

```html
<script src="ua-parser.js"></script> 
<script>
    const deviceInfos = UAParser(navigator.userAgent); 
    console.log(deviceInfos);
</script>
```

- Version en ligne :

```html
<script src="uaparse.js"></script> 
<script>
    const deviceInfos = UAParser(navigator.userAgent); 
    console.log(deviceInfos);
</script>
```


