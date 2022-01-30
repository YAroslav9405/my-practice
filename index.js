let fruits = [
  {id: 1, title: 'Яблука', price: 20, img: 'http://molbuk.ua/uploads/posts/2015-11/1446994035_04_apples.jpg'},
  {id: 2, title: 'Апельсини', price: 30, img: 'https://m.dom-eda.com/uploads/images/catalog/item/dfc9a3e974/3cbf3bd41c_1000.jpg'},
  {id: 3, title: 'Манго', price: 40, img: 'https://say.kyiv.ua/wp-content/uploads/2019/12/006175b2b1d4f5e405a77269b988029f9d3.jpg'}
]

const toHTML = fruit => `
<div class="col">
<div class="card" >
    <img src="${fruit.img}" style="height: 300px;" class="card-img-top" alt="${fruit.title}">
    <div class="card-body">
      <h5 class="card-title">${fruit.title}</h5>
      <a href="#" class="btn btn-primary" data-id="${fruit.id}" data-btn="price">Подивитись ціну</a>
      <a href="#" class="btn btn-danger"  data-id="${fruit.id}" data-btn="remove">Видалити</a>
    </div>
  </div>
</div>`

function render() {

  const html = fruits.map(toHTML).join('')
  document.querySelector('#fruits').innerHTML = html
}

render()


const priceModal = $.modal( {
    title: 'Ціна на товар' ,
    closable: true,
    width: '400px',
    footerButtons : [
      {text:'Закрити', type: 'primary', handler() {
        priceModal.close()
      }}
     
    ]


     
})

document.addEventListener('click', event => {
  event.preventDefault()
  const btnType = event.target.dataset.btn
  const id = +event.target.dataset.id
  const fruit = fruits.find(f => f.id === id)

  if(btnType === 'price') {
     

     priceModal.setContent(`
     <p>Ціна на ${fruit.title}: <strong>${fruit.price}$</strong></p>
     `)
     priceModal.open()
     } else if (btnType === 'remove') {
       $.confirm({
         title: 'Ви впевнені?',
         content: `<p>Ви видаляєте фрукт :<strong> ${fruit.title}</strong></p>`
       }).then(() => {
         console.log('Remove')
         fruits = fruits.filter(f => f.id != id)
         render()
       }).catch(() => {
         console.log('Cancel')
       })
    
     }

  })