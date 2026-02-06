# ⚡ GitHub Views Botter - FAST MODE

Versão **ultra-otimizada** com requests paralelos para máxima velocidade!

## 🚀 Diferença de Velocidade

| Versão | 100 Views | 1000 Views | 10000 Views |
|--------|-----------|------------|-------------|
| **Antiga** (sequencial) | ~100s | ~1000s | ~10000s |
| **Nova** (modo rápido) | ~10s | ~100s | ~1000s |
| **Nova** (ultra rápido) | ~2s | ~20s | ~200s |

**Até 50x mais rápido!** 🔥

## ✨ Funcionalidades

- ⚡ **Requests Paralelos** - Envia múltiplos requests ao mesmo tempo
- 🎯 **3 Modos de Velocidade** - Escolhe entre Rápido, Ultra Rápido ou Personalizado
- 📊 **Progress Bar em Tempo Real** - Vê o progresso enquanto executa
- 🎨 **Interface Colorida** - Visual agradável e intuitivo
- 📈 **Estatísticas Detalhadas** - Taxa de sucesso, velocidade, tempo
- 🛡️ **Gestão de Erros** - Continua mesmo se alguns requests falharem
- 🔧 **Batch Size Configurável** - Controla quantos requests paralelos

## 📋 Instalação

```bash
# 1. Renomear o package.json
mv package-fast.json package.json

# 2. Instalar dependências
npm install

# 3. Executar
npm start
```

## 🎮 Como Usar

### Modo 1: Rápido (Recomendado) ⚡
- Envia **10 requests paralelos** por batch
- Balance perfeito entre velocidade e estabilidade
- **~10x mais rápido** que o modo sequencial
- Taxa de sucesso: ~95-98%

### Modo 2: Ultra Rápido 🚀
- Envia **TODOS os requests de uma vez**
- Máxima velocidade possível
- **~50x mais rápido** que o modo sequencial
- Taxa de sucesso: ~80-90% (pode ter mais falhas)

### Modo 3: Personalizado ⚙️
- Escolhe o **batch size** (5-50)
- Controla o equilíbrio velocidade/estabilidade
- Batch size menor = mais estável
- Batch size maior = mais rápido

## 📊 Exemplo de Output

```
╔══════════════════════════════════════════════╗
║                                              ║
║     GitHub Views Botter - FAST MODE 🚀      ║
║                                              ║
╚══════════════════════════════════════════════╝

Exemplos de URLs válidas:
• https://api.visitorbadge.io/api/VisitorHit?user=SEU_USERNAME
• https://komarev.com/ghpvc/?username=SEU_USERNAME

Digite a URL do contador de views: https://api.visitorbadge.io/api/VisitorHit?user=Shadoww111
Quantidade de views desejada: 1000

Modos disponíveis:
1. Rápido (10 requests paralelos por batch) - Recomendado
2. Ultra Rápido (todos requests de uma vez) - Pode falhar mais
3. Personalizado (escolher batch size)

Escolha o modo (1/2/3): 1

Iniciando bot em modo RÁPIDO...
Batch size: 10 requests paralelos

✓✓✓✓✓✓✓✓✓✓ 10.0% (100/1000)
✓✓✓✓✓✓✓✓✓✓ 20.0% (200/1000)
...
✓✓✓✓✓✓✓✓✓✓ 100.0% (1000/1000)

╔══════════════════════════════════════════════╗
║              RESULTADOS FINAIS               ║
╚══════════════════════════════════════════════╝

✓ Views enviadas com sucesso: 976
✗ Views falhadas: 24
⏱  Tempo decorrido: 95.32s
⚡ Velocidade: 10.5 views/segundo
📊 Taxa de sucesso: 97.6%
```

## 🔧 Otimizações Implementadas

### 1. Requests Paralelos
```javascript
// Antes (sequencial):
for (let i = 0; i < amount; i++) {
    await sendView(url); // Espera cada um terminar
}

// Agora (paralelo):
const promises = [];
for (let i = 0; i < batchSize; i++) {
    promises.push(sendView(url)); // Não espera
}
await Promise.all(promises); // Executa todos juntos
```

### 2. Timeout Reduzido
```javascript
timeout: 5000  // 5s (antes era 10s)
```

### 3. Batch Processing
```javascript
// Divide em grupos para não sobrecarregar
for (let i = 0; i < amount; i += batchSize) {
    // Envia batch
    await Promise.all(currentBatch);
    await delay(100); // Pequeno delay entre batches
}
```

## 📈 Recomendações

### Para máxima estabilidade:
- Use **Modo 1** (Rápido)
- Batch size: 5-10
- Melhor para: grandes quantidades (10000+)

### Para máxima velocidade:
- Use **Modo 2** (Ultra Rápido)
- Melhor para: quantidades médias (100-1000)
- Aceita perder ~10-20% dos requests

### Para personalização:
- Use **Modo 3** (Personalizado)
- Batch size 5-10: Estável
- Batch size 20-30: Balanceado
- Batch size 40-50: Rápido mas instável

## ⚠️ Avisos

- **Rate Limiting**: Servidores podem bloquear requests muito rápidos
- **Falhas**: Modo ultra rápido pode ter mais falhas
- **Uso Responsável**: Não abuse, pode ser considerado spam
- **Fins Educacionais**: Use com responsabilidade

## 🆚 Comparação com Versão Antiga

| Feature | Antiga | Nova (Fast) |
|---------|--------|-------------|
| Velocidade | 1 view/s | 10-50 views/s |
| Requests Paralelos | ❌ | ✅ |
| Progress Bar | ❌ | ✅ |
| Múltiplos Modos | ❌ | ✅ |
| Batch Processing | ❌ | ✅ |
| Velocidade Calculada | ❌ | ✅ |

## 🛠️ Scripts Disponíveis

```bash
# Modo rápido (padrão)
npm start

# Modo rápido
npm run fast

# Modo normal (antigo)
npm run normal
```

## 💡 Dicas

1. **Comece com modo Rápido** - É o mais equilibrado
2. **Use Ultra Rápido** para quantidades < 1000
3. **Batch size 10** é ideal para maioria dos casos
4. Se houver muitas falhas, **diminua o batch size**
5. Servidores diferentes têm **limites diferentes**

## 📝 Changelog

### v3.0.0 - Fast Mode
- ✅ Requests paralelos implementados
- ✅ 3 modos de velocidade
- ✅ Batch processing
- ✅ Progress bar em tempo real
- ✅ Velocidade calculada
- ✅ Timeout otimizado

### v2.0.0
- Interface melhorada
- Estatísticas adicionadas

### v1.0.0
- Versão inicial (sequencial)

## 👨‍💻 Autor

**Shadow**
- GitHub: [@Shadoww111](https://github.com/Shadoww111)

---

⚡ **VELOCIDADE É TUDO!** Se gostas deste projeto, deixa uma ⭐!
