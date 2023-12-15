AFRAME.registerComponent('tree', {
    init: function () {
      const numTrees = 1000;

        for (let i = 0; i < numTrees; i++) {
          const tree = document.createElement("a-entity");
          const x = Math.random() * 830 - 425;
          const z = Math.random() * 823 - 434;
          tree.setAttribute('gltf-model',"#tree")
          tree.setAttribute('position', `${x} 1.4 ${z}`);
          tree.setAttribute("scale",{x:0.1,y:0.1,z:0.1})
          this.el.appendChild(tree);
        }
    },
  });
  