// first load the category
const loadCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories")
    const data = await response.json();

    let allCategory = data.data.news_category;

    const categoryBarContainer = document.getElementById("category-bar-container")

    allCategory.forEach((item) => {
        console.log(item);
        const div = document.createElement('div');
        div.className = 'border-2 border-red-600'
        div.innerHTML = `
        <button onclick="loadNews('${item.category_id}')" class="bg-green-500 rounded-xl text-white p-5">${item.
                category_name
            }</button>
        `
        categoryBarContainer.appendChild(div)
    })

}


const loadNews = async (catId) => {
    
    // show spinner
    const spinner = document.getElementById('loading-spiner');
    spinner.style.display = 'block';

    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`)

    const data = await response.json();
    const newContainer = document.getElementById('news-container')
   
    newContainer.innerHTML = '';
    
    // console.log(data.data);

    data.data.forEach((item) => {
         // clear spinner
        spinner.style.display = 'none';

        const div = document.createElement('div')
        div.classList.add("singleNews");
        div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
  <figure><img src="${item.image_url
  }" alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Details</button>
    </div>
  </div>
</div>
        `;
        newContainer.appendChild(div)
    });
};
const handleSearch = () => {
    const value = document.getElementById("search-box").value;

    if(value) {
        loadNews(value)
    }
    else{
        alert("please enter valid id number")
    }
}


loadNews('01')
loadCategory()