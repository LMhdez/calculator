function atualizar(valor) {
    // Get the current value in the result input field
    let resultadoatual = document.getElementById('result').value;

    if (resultadoatual=='Error') {
        document.getElementById('result').value='';
        atualizar(valor);
      }
    

    else{
      // Check if the value is 'C', 'CE', or '=' and handle them accordingly
    if (valor === 'C' || valor=='CE' || valor=='c') {
        // Clear the input field
        document.getElementById('result').value = '';
   
    } 
    else if (valor === '=' || valor == 'Enter') {
        if (resultadoatual === '') {
            document.getElementById('result').value = '';
        } else {
            try {
                // Evaluate the expression
                let resultado = math.evaluate(resultadoatual);
    
                // Adiciona uma nova linha à tabela
                let tabela = document.getElementById('historico');
                let linha = document.createElement('tr');
                tabela.tBodies[0].appendChild(linha);
    
                // Adiciona uma célula à linha e define seu conteúdo como a expressão
                let celulaExpressao = document.createElement('td');
                celulaExpressao.textContent = resultadoatual+' =  ';
                linha.appendChild(celulaExpressao);
    
                // Adiciona uma célula à linha e define seu conteúdo como o resultado da expressão
                let celulaResultado = document.createElement('td');
                celulaResultado.textContent = resultado;
                linha.appendChild(celulaResultado);
    
                // Define o valor do campo de resultado
                document.getElementById('result').value = resultado;
            } catch (error) {
                document.getElementById('result').value = 'Error';
            }
        }
    }
    
    
    
    
    
    else if (valor === 'DEL' || valor=='Backspace') {
        // Remove the last character 
        resultadoatual = resultadoatual.slice(0, -1);

        // Update the input field with the modified value
        if(resultadoatual === '' ){
            document.getElementById('result').value = '';
            
            
        }
        else{
            document.getElementById('result').value= resultadoatual;
            
        }
 
    }else if (valor === '$ > €' || valor=='$') {
        if(resultadoatual === '' ){
            document.getElementById('result').value = '';
            
            
        }
        else{
            // Adiciona uma nova linha à tabela
            let tabela = document.getElementById('historico');
            let linha = document.createElement('tr');
            tabela.tBodies[0].appendChild(linha);

            // Adiciona uma célula à linha e define seu conteúdo como a expressão
            let celulaExpressao = document.createElement('td');
            celulaExpressao.textContent = resultadoatual+ '$' +' =  ';
            linha.appendChild(celulaExpressao);

            // Adiciona uma célula à linha e define seu conteúdo como o resultado da expressão
            let celulaResultado = document.createElement('td');
            celulaResultado.textContent = (math.evaluate(resultadoatual)*0.919823).toFixed(3)+'€';
            linha.appendChild(celulaResultado);

        
        document.getElementById('result').value = (math.evaluate(resultadoatual)*0.919823).toFixed(3);


        }

        
 
    }else if (valor === '€ > $' || valor=='€') {
        
        if(resultadoatual === '' ){
            document.getElementById('result').value = '';
            
            
        }
        else{
        // Adiciona uma nova linha à tabela
        let tabela = document.getElementById('historico');
        let linha = document.createElement('tr');
        tabela.tBodies[0].appendChild(linha);

        // Adiciona uma célula à linha e define seu conteúdo como a expressão
        let celulaExpressao = document.createElement('td');
        celulaExpressao.textContent = resultadoatual+ '€' +' =  ';
        linha.appendChild(celulaExpressao);

        // Adiciona uma célula à linha e define seu conteúdo como o resultado da expressão
        let celulaResultado = document.createElement('td');
        celulaResultado.textContent = (math.evaluate(resultadoatual)*1.08728).toFixed(3)+'$';
        linha.appendChild(celulaResultado);
        document.getElementById('result').value = (math.evaluate(resultadoatual)*1.08728).toFixed(3);
        }
        
 
    }else {
        
        // Update the input field with the clicked button value
        if (resultadoatual === '') {
            document.getElementById('result').value = valor;
        } else {
            document.getElementById('result').value = resultadoatual + valor;
        }
        
        
    }
}
}



// Get all the buttons in the calculator
const botoes = document.querySelectorAll('input[type="button"]');

// Attach an event listener to each button
botoes.forEach(botao => {
    botao.addEventListener('click', function () {
        // Call the atualizar function with the button value
        atualizar(botao.value);
    });
});

// Função para processar o evento de teclado
function handleKeyPress(event) {
    // Obtém o valor da tecla pressionada
    let key = event.key;

    // Verifica se a tecla pressionada é um número, operador ou tecla especial
    if (/\d|[+\-*/%=.$c€]|Enter|Backspace/i.test(key)) {
        if (key !== 'Control' && key !== 'CapsLock'){
        // Chama a função atualizar com o valor correspondente à tecla pressionada
        atualizar(key);
    }
    }
}

// Adiciona um ouvinte de eventos de teclado ao documento
document.addEventListener('keydown', handleKeyPress);

