(function() {
    /* Begin initial setup of scene, camera, renderer
      1)  In order to actually display anything with threejs, we need the following three things:

          1) Scene
                Create a scene with this code:  var scene = new THREE.Scene();

          2) Camera
                PerspectiveCamera is one type of camera in threejs. It takes in 4 parameters.
                1) Field of view (FOV) - Unit: Degrees - The extent of the scene that we see on the display at any given moment 
                2) Aspect Ratio - Width of the element divided by the height of the element (otherwise the image will look squished)
                3) Near Clipping Plane (Objects closer to the camera won't be rendered)
                4) Far Clipping Plane (Objects farther from the camera won't be rendered)
                Code to define a camera: var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

          3) Renderer
                We typically use the WebGLRenderer, but threejs has a few others for fallbacks for older browsers
                Code to define renderer and set the size:
                  var renderer = new THREE.WebGLRenderer();
                  renderer.setSize( window.innerWidth, window.innerHeight );
                
                Now, add the renderer element (canvas element) to our HTML document (in my case, to a div with id ring-of-cube)
                document.getElementById('ring-of-cube').appendChild( renderer.domElement );
    */
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
      var renderer = new THREE.WebGLRenderer();

      renderer.setSize( window.innerWidth, window.innerHeight );
      document.getElementById('ring-of-cube').appendChild( renderer.domElement );



    /* Create a cube using a BoxGeometry object 
       BoxGeometry object: contains all the points (vertices) and fill (faces) of the cube.
        -Example code of BoxGeometry object: var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        -We need to add a material to color it. threejs comes with many materials, but we will use
        MeshBasicMaterial
        -Materials take an object of properties. We will provide just a color attribute
        -Now add a Mesh (an object that takes a geometry and applies a material to it) - so it can move freely around the scene
        -When we call scene.add(), by default it will be added to the coordinates (0,0,0). Unfortunately this would cause both the camera and the cube to be inside each other. 
        -To handle this, we are moving the camera 5px away. 
    */
      var geometry = new THREE.BoxGeometry(500, 500, 500, 10, 10, 10);

      var material = new THREE.MeshBasicMaterial({ 
        color: 0x736AFF,
        wireframe: true 
      });

      var cube = new THREE.Mesh( geometry, material );
      scene.add( cube );
      camera.position.z = 1000;



    /* Render the scene 
       -To actually see something, we need to render something first. We need a render loop (animate loop)
       -We are going to create a loop that causes the renderer to draw the scene every time the screen is refreshed (60 times per second typically)
       -We can't use setInterval when writing threejs/games in the browser. However, requestAnimationFrame has advantages.
       -For example, the animation will pause when the user navigates to another browser tab (to save processing power and battery life)
       At this point in code, we just see a static box that doesn't move.
    */
      function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      }

    /* Animate the cube 
       -Now that we see a static colored cube, we want to make it rotate or do something so it moves
       -Above the call to the render function, add the following code:
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        This rotation will run every frame (typically 60 times per second)
    */
      animate();
})();