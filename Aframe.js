
<script src="https://aframe.io/releases/1.3.0/aframe.min.js"></script>
<script src="https://unpkg.com/aframe-environment-component/dist/aframe-environment-component.min.js"></script>
<script> type="text/javascript"  src="./Simbolos3D.html"</script>
/head>
  <body>
    <div id= 'imagens3D'>
    <a-scene>
      <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
      <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
      <a-sky color="#ECECEC"></a-sky>
      <a-gltf-model src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF/Avocado.gltf" rotation="0 4 0" scale="6 6 6" position="0 1 -2"></a-gltf-model>
    </a-scene>

  </body>
</html>
