const { Abacate } = require('abacatepay');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ABACATEPAY_API_KEY;
  
  if (!apiKey) {
    console.error("A chave de API da AbacatePay não está configurada.");
    return res.status(500).json({ 
      success: false, 
      error: 'API key não configurada' 
    });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ 
      success: false, 
      error: 'ID do pagamento é obrigatório' 
    });
  }

  try {
    const abacatePay = Abacate(apiKey);

    const checkResponse = await abacatePay.pixQrCode.check({ id });

    if (checkResponse.error) {
      console.error("Erro ao checar status do QRCode PIX:", checkResponse.error);
      return res.status(500).json({ 
        success: false, 
        error: checkResponse.error 
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        status: checkResponse.data.status,
        expiresAt: checkResponse.data.expiresAt,
      }
    });

  } catch (error) {
    console.error("Erro ao verificar pagamento:", error);
    return res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor' 
    });
  }
}