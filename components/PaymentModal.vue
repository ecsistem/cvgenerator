<template>
  <div v-if="isOpen" class="payment-modal-overlay" @click="closeModal">
    <div class="payment-modal" @click.stop>
      <div class="payment-modal__header">
        <h3 class="payment-modal__title">{{ $t('payment-required') }}</h3>
        <button class="payment-modal__close" @click="closeModal">
          <svg class="payment-modal__close-icon">
            <use href="@/assets/sprite.svg#close"></use>
          </svg>
        </button>
      </div>
      
      <div class="payment-modal__content">
        <div v-if="!paymentData" class="payment-modal__loading">
          <p>{{ $t('generating-payment') }}...</p>
        </div>
        
        <div v-else-if="paymentStatus === 'pending'" class="payment-modal__payment">
          <div class="payment-modal__info">
            <p class="payment-modal__description">
              {{ $t('payment-description') }}
            </p>
            <div class="payment-modal__amount">
              R$ 5,00
            </div>
          </div>
          
          <div class="payment-modal__qr-section">
            <div class="payment-modal__qr-code">
              <img :src="paymentData.qrCodeImage" alt="QR Code PIX" />
            </div>
            <div class="payment-modal__pix-code">
              <label class="payment-modal__label">{{ $t('pix-code') }}:</label>
              <div class="payment-modal__code-container">
                <input 
                  ref="pixCodeInput"
                  :value="paymentData.pixCode" 
                  readonly 
                  class="payment-modal__code-input"
                />
                <button 
                  class="payment-modal__copy-btn"
                  @click="copyPixCode"
                >
                  {{ $t('copy') }}
                </button>
              </div>
            </div>
          </div>
          
          <div class="payment-modal__status">
            <p class="payment-modal__status-text">
              {{ $t('waiting-payment') }}
            </p>
            <div class="payment-modal__timer">
              {{ $t('expires-in') }}: {{ formatTime(timeRemaining) }}
            </div>
          </div>
        </div>
        
        <div v-else-if="paymentStatus === 'paid'" class="payment-modal__success">
          <div class="payment-modal__success-icon">✅</div>
          <p class="payment-modal__success-text">
            {{ $t('payment-confirmed') }}
          </p>
          <button class="form__btn" @click="downloadPdf">
            {{ $t('download-cv-pdf') }}
          </button>
        </div>
        
        <div v-else-if="paymentStatus === 'expired'" class="payment-modal__expired">
          <div class="payment-modal__expired-icon">⏰</div>
          <p class="payment-modal__expired-text">
            {{ $t('payment-expired') }}
          </p>
          <button class="form__btn" @click="generateNewPayment">
            {{ $t('generate-new-payment') }}
          </button>
        </div>
        
        <div v-else-if="paymentStatus === 'error'" class="payment-modal__error">
          <div class="payment-modal__error-icon">❌</div>
          <p class="payment-modal__error-text">
            {{ $t('payment-error') }}
          </p>
          <button class="form__btn" @click="generateNewPayment">
            {{ $t('try-again') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ref, computed, onMounted, onUnmounted } from '@nuxtjs/composition-api';

interface PaymentData {
  id: string;
  pixCode: string;
  qrCodeImage: string;
  expiresAt: string;
}

export default Vue.extend({
  name: 'PaymentModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const paymentData = ref<PaymentData | null>(null);
    const paymentStatus = ref<'pending' | 'paid' | 'expired' | 'error'>('pending');
    const timeRemaining = ref(0);
    const checkInterval = ref<NodeJS.Timeout | null>(null);
    const timerInterval = ref<NodeJS.Timeout | null>(null);

    const generatePayment = async () => {
      try {
        const response = await fetch('/api/create-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: 500, // R$ 5,00 em centavos
            description: 'Download CV em PDF',
          }),
        });

        const result = await response.json();
        
        if (result.success) {
          paymentData.value = result.data;
          paymentStatus.value = 'pending';
          startPaymentCheck();
          startTimer();
        } else {
          paymentStatus.value = 'error';
        }
      } catch (error) {
        console.error('Erro ao gerar pagamento:', error);
        paymentStatus.value = 'error';
      }
    };

    const startPaymentCheck = () => {
      if (checkInterval.value) {
        clearInterval(checkInterval.value);
      }
      
      checkInterval.value = setInterval(async () => {
        if (!paymentData.value) return;
        
        try {
          const response = await fetch(`/api/check-payment/${paymentData.value.id}`);
          const result = await response.json();
          
          if (result.success) {
            if (result.data.status === 'paid') {
              paymentStatus.value = 'paid';
              clearInterval(checkInterval.value!);
              clearInterval(timerInterval.value!);
            } else if (result.data.status === 'expired') {
              paymentStatus.value = 'expired';
              clearInterval(checkInterval.value!);
              clearInterval(timerInterval.value!);
            }
          }
        } catch (error) {
          console.error('Erro ao verificar pagamento:', error);
        }
      }, 3000); // Verifica a cada 3 segundos
    };

    const startTimer = () => {
      if (!paymentData.value) return;
      
      const expiresAt = new Date(paymentData.value.expiresAt).getTime();
      
      timerInterval.value = setInterval(() => {
        const now = new Date().getTime();
        const remaining = Math.max(0, expiresAt - now);
        timeRemaining.value = Math.floor(remaining / 1000);
        
        if (remaining <= 0) {
          paymentStatus.value = 'expired';
          clearInterval(timerInterval.value!);
          clearInterval(checkInterval.value!);
        }
      }, 1000);
    };

    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const copyPixCode = async () => {
      if (paymentData.value) {
        try {
          await navigator.clipboard.writeText(paymentData.value.pixCode);
          // Você pode adicionar uma notificação de sucesso aqui
        } catch (error) {
          console.error('Erro ao copiar código PIX:', error);
        }
      }
    };

    const closeModal = () => {
      emit('close');
      if (checkInterval.value) {
        clearInterval(checkInterval.value);
      }
      if (timerInterval.value) {
        clearInterval(timerInterval.value);
      }
    };

    const downloadPdf = () => {
      emit('download-pdf');
      closeModal();
    };

    const generateNewPayment = () => {
      paymentData.value = null;
      paymentStatus.value = 'pending';
      generatePayment();
    };

    onMounted(() => {
      if (props.isOpen) {
        generatePayment();
      }
    });

    onUnmounted(() => {
      if (checkInterval.value) {
        clearInterval(checkInterval.value);
      }
      if (timerInterval.value) {
        clearInterval(timerInterval.value);
      }
    });

    return {
      paymentData,
      paymentStatus,
      timeRemaining,
      formatTime,
      copyPixCode,
      closeModal,
      downloadPdf,
      generateNewPayment,
    };
  },
});
</script>

<style lang="postcss" scoped>
.payment-modal-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50;
}

.payment-modal {
  @apply bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-screen overflow-y-auto;
}

.payment-modal__header {
  @apply flex items-center justify-between p-6 border-b;
}

.payment-modal__title {
  @apply text-xl font-bold text-gray-800;
}

.payment-modal__close {
  @apply p-2 hover:bg-gray-100 rounded-full transition-colors;
}

.payment-modal__close-icon {
  @apply w-5 h-5;
}

.payment-modal__content {
  @apply p-6;
}

.payment-modal__loading {
  @apply text-center py-8;
}

.payment-modal__info {
  @apply mb-6;
}

.payment-modal__description {
  @apply text-gray-600 mb-4;
}

.payment-modal__amount {
  @apply text-2xl font-bold text-green-600 text-center;
}

.payment-modal__qr-section {
  @apply mb-6;
}

.payment-modal__qr-code {
  @apply flex justify-center mb-4;
}

.payment-modal__qr-code img {
  @apply w-48 h-48 border rounded;
}

.payment-modal__pix-code {
  @apply mb-4;
}

.payment-modal__label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}

.payment-modal__code-container {
  @apply flex gap-2;
}

.payment-modal__code-input {
  @apply flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono;
}

.payment-modal__copy-btn {
  @apply px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors;
}

.payment-modal__status {
  @apply text-center;
}

.payment-modal__status-text {
  @apply text-gray-600 mb-2;
}

.payment-modal__timer {
  @apply text-lg font-mono text-orange-600;
}

.payment-modal__success,
.payment-modal__expired,
.payment-modal__error {
  @apply text-center py-8;
}

.payment-modal__success-icon {
  @apply text-4xl mb-4;
}

.payment-modal__success-text {
  @apply text-green-600 font-medium mb-4;
}

.payment-modal__expired-icon,
.payment-modal__error-icon {
  @apply text-4xl mb-4;
}

.payment-modal__expired-text,
.payment-modal__error-text {
  @apply text-gray-600 mb-4;
}
</style>