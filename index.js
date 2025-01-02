import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    //  random cocktail
    const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    console.log(result.data.drinks[0]);
    res.render("index.ejs", { content: result.data.drinks[0] });
  } catch (error) {
    res.render("index.ejs", { content: error.message });
  }
});

app.get("/browse", async (req, res) => {
  const searchName = req.query.search;
  try {
    // browse cocktail by names
    const result = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchName}`);
    const drinks = result.data.drinks || null; 
    console.log(drinks[0]);
    res.render("browse.ejs", { content: drinks });
  } catch (error) {
    res.render("browse.ejs", {content: null, error: error.message });
  }
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
