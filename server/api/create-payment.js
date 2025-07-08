const { Abacate } = require('abacatepay');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
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

  const { amount, description } = req.body;

  if (!amount || !description) {
    return res.status(400).json({ 
      success: false, 
      error: 'Amount e description são obrigatórios' 
    });
  }

  try {
    const abacatePay = Abacate(apiKey);

    const pixQrCodeData = {
      amount: amount, // Valor em centavos
      expiresIn: 1800, // 30 minutos
      description: description,
    };

    const createResponse = await abacatePay.pixQrCode.create(pixQrCodeData);

    if (createResponse.error) {
      console.error("Erro ao criar QRCode PIX:", createResponse.error);
      return res.status(500).json({ 
        success: false, 
        error: createResponse.error 
      });
    }

    const paymentData = createResponse.data;

    return res.status(200).json({
      success: true,
      data: {
        id: paymentData.id,
        pixCode: paymentData.pixCode,
        qrCodeImage: paymentData.qrCodeImage,
        expiresAt: paymentData.expiresAt,
      }
    });

  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    return res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor' 
    });
  }
}