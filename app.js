let express=require('express');
let app=express();

let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
  ];
  
  // Récupérer la liste de tous les produits
app.get('/products', (req, res) => {
    res.json(products);
  });
  
  // Récupérer les détails d'un produit par ID
  app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);
  
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(product);
    }
  });
  
  // Rechercher des produits en fonction des critères (q, minPrice, maxPrice)
  app.get('/products/search', (req, res) => {
    const { q, minPrice, maxPrice } = req.query;
    let filteredProducts = products;
  
    if (q) {
      filteredProducts = filteredProducts.filter((p) =>
        p.name.toLowerCase().includes(q.toLowerCase())
      );
    }
  
    if (minPrice) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price >= parseFloat(minPrice)
      );
    }
  
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price <= parseFloat(maxPrice)
      );
    }
  
    res.json(filteredProducts);
  });
  
  // Créer un nouveau produit
  app.post('/products', (req, res) => {
    const newProduct = req.body;
    newProduct.id = products.length + 1;
    products.push(newProduct);
    res.status(201).json(newProduct);
  });
  
  // Mettre à jour un produit par ID
  app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
  
    const index = products.findIndex((p) => p.id === productId);
  
    if (index === -1) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      products[index] = { ...products[index], ...updatedProduct };
      res.json(products[index]);
    }
  });
  
  // Supprimer un produit par ID
  app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex((p) => p.id === productId);
  
    if (index === -1) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      products.splice(index, 1);
      res.status(204).send();
    }
  });
  
  // Démarrer le serveur
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  