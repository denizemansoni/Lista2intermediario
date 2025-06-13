//**Estruturas de Controle Avançadas**//
const prompt = require('prompt-sync')();
// 1. Validação de Datas
// Crie a função ehDataValida (dia, mes, ano) que retorne true se os valores formarem uma data real (meses de 28-31 dias, ano bissexto para fevereiro) e false caso contrário.

function ehDataValida (dia, mes, ano){
    const diasPorMes = {
        1: 31, 2: (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) ? 29 : 28,
        3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
    };
    return mes >= 1 && mes <= 12 && dia >= 1 && dia <= diasPorMes[mes];
}
console.log(ehDataValida(29, 2, 2024));
console.log(ehDataValida(30, 2, 2025));
console.log(ehDataValida(15, 8, 2025));

// 2. Jogo de adivinhação
//Escreva um script que gere um número aleatório de 1 a 100 e peça ao usuário para adivinhar. Use while para repetir até acertar, contando tentativas e exibindo "mais alto" ou "mais baixo" a cada palpite errado.

const numeroAleatorio = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;
let palpite;

console.log(`Olá!! :) 
    Seja Bem Vindo ao Jogo de Adivinhação!! 
    Tente acertar o número de 1 a 100.`);


do{
    palpite= parseInt(prompt("Digite seu palpite: "));
    tentativas++;

    if (palpite < numeroAleatorio){
        console.log("Mais Alto!!");
    } else if(palpite > numeroAleatorio){
        console.log("Mais Baixo!!");
    } else{
        console.log(`Parabéns!!! Você acertou em ${tentativas} tentativas.`);
    }
} while (palpite !== numeroAleatorio);

// 3.Palavras Únicas
// Dada uma string (ex.: "olá olá mundo mundo"), use if/else e for para extrair todas as palavras únicas e exibi-las em um array.

function palavrasUnicas(texto){
    const palavras = texto.toLowerCase().replace(/[,.!?]/g, "").split(" ");
    const unicas = [];

    for (let i = 0; i < palavras.length; i++){
        if (!unicas.includes(palavras[i])){
            unicas.push(palavras[i]);
        }
    }
    return unicas;
}

console.log(palavrasUnicas("Bom dia, Bom dia, Bom dia, Quartou, Quartou"));

// Seção 2: Funções e Recursão
// 4. Fatorial Recursivo
//Implemente function fatorial(n) de forma recursiva; trate n < 0 lançando um Error, e n === 0 retornando 1

function fatorial(n){
    if (n < 0){
        throw new Error("O fatorial não é definido para números negativos");
    }
    if (n === 0){
        return 1;
    }
    return n * fatorial(n - 1);
}

try {
    console.log (fatorial(8));
    console.log(fatorial(0));
    console.log(fatorial(-4));
} catch (erro){
    console.log("Erro detectado: ", erro.message);
}

//5. Debounce
//Crie function debounce(fn, delay) que receba uma função fn e um delay em ms, retornando uma nova função que só executa fn se não for chamada novamente dentro do intervalo.

function debounce(fn, delay) {
    let timer;
    return function (...args){
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    }
}
const contar = debounce (() => console.log ("Feito!"), 1000);
contar();
contar();
contar();
setTimeout(() => contar(), 1500);

//6. Memoization
//Implemente function memoize(fn) que armazene em cache chamadas anteriores de fn (por argumentos), retornando resultados instantâneos em repetidas invocações.

function memoize(fn){
    const cache = {};
    return function(...args){
        const key = JSON.stringify(args)
        if (cache[key]){
            console.log("Retornando do cache!");
            return cache[key];
        }
        const result = fn(...args);
        cache [key] = result;
        return result;
    };
}
function fatorial(n){
    if (n < 0) throw new Error("Número inválido!");
    return n === 0 ? 1 : n * fatorial(n - 1);
}
const fatorialMemoizado = memoize(fatorial);
console.log(fatorialMemoizado(5));
console.log(fatorialMemoizado(5));

//Seção 3: Arrays e Objetos Complexos

//7. Mapeamento e Ordenação
// Dado um array produtos = [{ nome, preco }, ...], crie uma função que retorne um novo array apenas com os nomes, ordenados por preço crescente, usando map, sort.
const produtos = [
    { nome: "Farinha de Trigo", preco: 4 },
    { nome: "Ovos", preco: 20 },
    { nome: "Açúcar", preco: 5 },
    { nome: "Maçã", preco: 15 },
]
const produtosOrdenados = produtos.sort((a, b) => a.preco - b.preco);
const nomesOrdenados = produtosOrdenados.map(produtos => produtos.nome);
console.log(nomesOrdenados);

//8. Agrupamento por Propriedade
//Em vendas = [{ cliente, total }, ...], use reduce para gerar um objeto onde cada chave é um cliente e o valor é a soma de todos os seus total.
