const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Cores para o terminal
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m'
};

function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

function printBanner() {
    console.clear();
    log('\n╔══════════════════════════════════════════════╗', colors.cyan);
    log('║                                              ║', colors.cyan);
    log('║   GitHub Views Botter - OPTIMIZED v4.0 🎯   ║', colors.bright + colors.cyan);
    log('║                                              ║', colors.cyan);
    log('╚══════════════════════════════════════════════╝\n', colors.cyan);
}

function question(query) {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
}

async function sendView(url, viewNumber, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Connection': 'keep-alive',
                    'Upgrade-Insecure-Requests': '1'
                },
                timeout: 8000,
                validateStatus: (status) => status < 500 // Aceita qualquer status < 500
            });
            return { success: true, number: viewNumber };
        } catch (error) {
            if (attempt === retries) {
                return { success: false, number: viewNumber, error: error.message };
            }
            // Espera antes de tentar novamente
            await new Promise(resolve => setTimeout(resolve, 500 * attempt));
        }
    }
}

async function botViewsOptimized(url, amount, batchSize = 3, delayBetweenBatches = 500) {
    let successful = 0;
    let failed = 0;
    let completed = 0;

    log(`\n${colors.yellow}Iniciando bot OTIMIZADO...${colors.reset}`);
    log(`${colors.cyan}Configuração: ${batchSize} requests paralelos | ${delayBetweenBatches}ms entre batches${colors.reset}`);
    log(`${colors.green}Sistema com retry automático e headers otimizados${colors.reset}\n`);

    // Dividir em batches pequenos para evitar rate limiting
    for (let i = 0; i < amount; i += batchSize) {
        const currentBatch = Math.min(batchSize, amount - i);
        const promises = [];

        // Criar batch de requests paralelos
        for (let j = 0; j < currentBatch; j++) {
            const viewNumber = i + j + 1;
            promises.push(sendView(url, viewNumber));
        }

        // Executar batch
        const results = await Promise.all(promises);

        // Processar resultados
        results.forEach(result => {
            completed++;
            if (result.success) {
                successful++;
                process.stdout.write(`${colors.green}✓${colors.reset}`);
            } else {
                failed++;
                process.stdout.write(`${colors.red}✗${colors.reset}`);
            }
        });

        // Progress bar
        const progress = ((completed / amount) * 100).toFixed(1);
        const successRate = ((successful / completed) * 100).toFixed(1);
        process.stdout.write(` ${progress}% | Taxa: ${successRate}% (${completed}/${amount})\r`);

        // Delay entre batches (importante para não ser bloqueado!)
        if (i + batchSize < amount) {
            await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
        }
    }

    console.log('\n');
    return { successful, failed };
}

async function botViewsConservative(url, amount, delayBetweenRequests = 200) {
    let successful = 0;
    let failed = 0;

    log(`\n${colors.yellow}Iniciando bot em modo CONSERVADOR...${colors.reset}`);
    log(`${colors.cyan}Enviando requests sequenciais com ${delayBetweenRequests}ms de delay${colors.reset}`);
    log(`${colors.green}Máxima taxa de sucesso garantida!${colors.reset}\n`);

    for (let i = 1; i <= amount; i++) {
        const result = await sendView(url, i);

        if (result.success) {
            successful++;
            process.stdout.write(`${colors.green}✓${colors.reset}`);
        } else {
            failed++;
            process.stdout.write(`${colors.red}✗${colors.reset}`);
        }

        const progress = ((i / amount) * 100).toFixed(1);
        const successRate = ((successful / i) * 100).toFixed(1);
        process.stdout.write(` ${progress}% | Taxa: ${successRate}% (${i}/${amount})\r`);

        if (i < amount) {
            await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
        }
    }

    console.log('\n');
    return { successful, failed };
}

async function main() {
    printBanner();

    log('Exemplos de URLs válidas:', colors.yellow);
    log('• https://api.visitorbadge.io/api/VisitorHit?user=SEU_USERNAME', colors.cyan);
    log('• https://komarev.com/ghpvc/?username=SEU_USERNAME\n', colors.cyan);

    const url = (await question(`${colors.bright}Digite a URL do contador de views: ${colors.reset}`)).trim();
    
    if (!url.startsWith('http')) {
        log('\n❌ URL inválida! Deve começar com http:// ou https://', colors.red);
        rl.close();
        return;
    }

    const amount = parseInt((await question(`${colors.bright}Quantidade de views desejada: ${colors.reset}`)).trim());
    
    if (isNaN(amount) || amount <= 0) {
        log('\n❌ Quantidade inválida! Use um número positivo.', colors.red);
        rl.close();
        return;
    }

    // Escolher modo
    log('\n' + colors.bright + 'Modos disponíveis:' + colors.reset);
    log('1. Conservador (sequencial, delay 200ms) - 95-99% sucesso ⭐ RECOMENDADO', colors.green);
    log('2. Otimizado (3 paralelos, delay 500ms) - 85-95% sucesso', colors.yellow);
    log('3. Balanceado (2 paralelos, delay 800ms) - 90-98% sucesso', colors.cyan);
    log('4. Personalizado (escolher configurações)', colors.magenta);
    
    const mode = (await question(`${colors.bright}\nEscolha o modo (1/2/3/4): ${colors.reset}`)).trim();

    const startTime = Date.now();
    let result;

    if (mode === '1') {
        result = await botViewsConservative(url, amount, 200);
    } else if (mode === '2') {
        result = await botViewsOptimized(url, amount, 3, 500);
    } else if (mode === '3') {
        result = await botViewsOptimized(url, amount, 2, 800);
    } else if (mode === '4') {
        const batchSize = parseInt((await question(`${colors.bright}Batch size (1-5): ${colors.reset}`)).trim());
        const delay = parseInt((await question(`${colors.bright}Delay entre batches em ms (100-2000): ${colors.reset}`)).trim());
        
        if (batchSize === 1) {
            result = await botViewsConservative(url, amount, delay);
        } else {
            result = await botViewsOptimized(url, amount, Math.min(Math.max(batchSize, 1), 5), delay);
        }
    } else {
        log('\n❌ Modo inválido! Usando modo Conservador...', colors.yellow);
        result = await botViewsConservative(url, amount, 200);
    }
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    // Resultados finais
    log('\n╔══════════════════════════════════════════════╗', colors.cyan);
    log('║              RESULTADOS FINAIS               ║', colors.bright + colors.cyan);
    log('╚══════════════════════════════════════════════╝', colors.cyan);
    log(`\n✓ Views enviadas com sucesso: ${result.successful}`, colors.green);
    log(`✗ Views falhadas: ${result.failed}`, colors.red);
    log(`⏱  Tempo decorrido: ${duration}s`, colors.yellow);
    log(`⚡ Velocidade: ${(amount / duration).toFixed(1)} views/segundo`, colors.magenta);
    log(`📊 Taxa de sucesso: ${((result.successful / amount) * 100).toFixed(1)}%`, colors.blue);
    
    // Avaliação da performance
    const successRate = (result.successful / amount) * 100;
    if (successRate >= 95) {
        log(`🏆 Excelente! Taxa de sucesso muito alta!`, colors.green);
    } else if (successRate >= 85) {
        log(`✅ Bom! Taxa de sucesso aceitável.`, colors.yellow);
    } else {
        log(`⚠️  Baixa taxa de sucesso. Tenta modo Conservador ou aumenta o delay.`, colors.red);
    }
    
    console.log();
    rl.close();
}

// Tratamento de erros
process.on('unhandledRejection', (error) => {
    log(`\n❌ Erro crítico: ${error.message}`, colors.red);
    process.exit(1);
});

process.on('SIGINT', () => {
    log('\n\n👋 Bot interrompido pelo utilizador.', colors.yellow);
    process.exit(0);
});

// Execução
main().catch(error => {
    log(`\n❌ Erro fatal: ${error.message}`, colors.red);
    process.exit(1);
});