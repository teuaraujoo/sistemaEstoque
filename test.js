

function logar() {
    
    const arr = [];
    
    const a =  { "PRODUTO_ID": 1, "QUANT": 2 };
    arr.push(a);
    const b =  { "PRODUTO_ID": 2, "QUANT": 1 };
    arr.push(b);
    
    const data = {arr}
    return data;
}

const data = logar();
// console.log(data)
const {arr} = data;

let soma = 0;
for (item of arr) {
    soma += item.PRODUTO_ID;
}
console.log(soma)

/* 


{
  arr: [
    { produto_id: 1, quantidade: 2 },
    { produto_id: 2, quantidade: 1 }
  ]
}




*/

