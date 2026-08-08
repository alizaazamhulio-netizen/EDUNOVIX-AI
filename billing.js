/**
 * NOVIX - Billing & Subscription Controller
 * Handles plan selection, coupon calculations, live form validation,
 * payment simulations, localStorage persistence, and redirection.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. State Management & Configuration
     ========================================================================== */
  const PLANS = {
    monthly: {
      id: 'monthly',
      name: 'Pro Monthly',
      cycleText: 'Billed monthly ($9.99/mo)',
      summaryCycle: '1 Month Subscription • Billed Monthly',
      recurNote: 'Then $9.99/mo until cancelled',
      basePrice: 9.99,
      badgeText: 'FLEXIBLE',
      savingsPercent: 0
    },
    yearly: {
      id: 'yearly',
      name: 'Pro Yearly',
      cycleText: 'Billed annually ($5.99/mo)',
      summaryCycle: '1 Year Subscription • Billed Annually',
      recurNote: 'Then $71.88/yr until cancelled',
      basePrice: 71.88,
      badgeText: 'BEST VALUE',
      savingsPercent: 40
    }
  };

  // Demo discount coupons
  const COUPONS = {
    'STUDY20': { type: 'percent', value: 20, label: '20% OFF' },
    'PRO50': { type: 'percent', value: 50, label: '50% OFF' },
    'STUDENT': { type: 'fixed', value: 10.00, label: '$10.00 OFF' },
    'WELCOME15': { type: 'percent', value: 15, label: '15% OFF' },
    'AIREADY': { type: 'percent', value: 25, label: '25% OFF' }
  };

  let state = {
    selectedPlan: 'yearly', // Default to best-value Yearly plan
    selectedPaymentMethod: 'card',
    appliedCoupon: null,
    isSubmitting: false,
    redirectTimer: null
  };

  /* ==========================================================================
     2. DOM Element Selectors
     ========================================================================== */
  // Navigation & Header
  const userTierBadge = document.getElementById('user-tier-badge');

  // Plan Controls
  const cycleToggleBtn = document.getElementById('cycle-toggle-btn');
  const labelMonthly = document.getElementById('label-monthly');
  const labelYearly = document.getElementById('label-yearly');
  const planCardMonthly = document.getElementById('plan-card-monthly');
  const planCardYearly = document.getElementById('plan-card-yearly');
  const btnSelectMonthly = document.getElementById('btn-select-monthly');
  const btnSelectYearly = document.getElementById('btn-select-yearly');

  // Billing Form Elements
  const billingForm = document.getElementById('billing-form');
  const inputFullName = document.getElementById('full-name');
  const inputEmail = document.getElementById('email-address');
  const selectCountry = document.getElementById('country-select');
  const groupFullName = document.getElementById('group-full-name');
  const groupEmail = document.getElementById('group-email');
  const groupCountry = document.getElementById('group-country');
  const groupTerms = document.getElementById('group-terms');
  const termsCheckbox = document.getElementById('terms-checkbox');

  // Payment Tabs & Panels
  const paymentTabs = document.querySelectorAll('.payment-tab');
  const cardInputsPanel = document.getElementById('card-inputs-panel');
  const altPaymentPanel = document.getElementById('alt-payment-panel');
  const altProviderTitle = document.getElementById('alt-provider-title');
  const altProviderDesc = document.getElementById('alt-provider-desc');

  // Card Inputs
  const inputCardNumber = document.getElementById('card-number');
  const inputCardExpiry = document.getElementById('card-expiry');
  const inputCardCvv = document.getElementById('card-cvv');
  const groupCardNumber = document.getElementById('group-card-number');
  const groupCardExpiry = document.getElementById('group-expiry');
  const groupCardCvv = document.getElementById('group-cvv');
  const cardBrandIcon = document.getElementById('card-brand-icon');

  // Coupon Elements
  const inputCoupon = document.getElementById('coupon-input');
  const btnApplyCoupon = document.getElementById('btn-apply-coupon');
  const couponFeedback = document.getElementById('coupon-feedback');
  const activeCouponPill = document.getElementById('active-coupon-pill');
  const pillCodeText = document.getElementById('pill-code-text');
  const pillDiscountText = document.getElementById('pill-discount-text');
  const btnRemoveCoupon = document.getElementById('btn-remove-coupon');

  // Order Summary Elements
  const summaryPlanName = document.getElementById('summary-plan-name');
  const summaryPlanBadge = document.getElementById('summary-plan-badge');
  const summaryPlanCycle = document.getElementById('summary-plan-cycle');
  const summaryPlanBasePrice = document.getElementById('summary-plan-base-price');
  const breakdownSubtotal = document.getElementById('breakdown-subtotal');
  const breakdownDiscountRow = document.getElementById('breakdown-discount-row');
  const breakdownDiscountTag = document.getElementById('breakdown-discount-tag');
  const breakdownDiscount = document.getElementById('breakdown-discount');
  const breakdownTax = document.getElementById('breakdown-tax');
  const breakdownTotal = document.getElementById('breakdown-total');
  const summaryRecurNote = document.getElementById('summary-recur-note');
  const btnSubmitCheckout = document.getElementById('btn-submit-checkout');
  const btnCtaText = document.getElementById('btn-cta-text');
  const btnPricePreview = document.getElementById('btn-price-preview');
  const checkoutSpinner = document.getElementById('checkout-spinner');
  const btnLockSvg = document.getElementById('btn-lock-svg');

  // Success Modal Elements
  const successModal = document.getElementById('success-modal');
  const modalOrderId = document.getElementById('modal-order-id');
  const modalPlanName = document.getElementById('modal-plan-name');
  const modalUserEmail = document.getElementById('modal-user-email');
  const modalAmountPaid = document.getElementById('modal-amount-paid');
  const redirectCounter = document.getElementById('redirect-counter');
  const btnModalDashboard = document.getElementById('btn-modal-dashboard');
  const btnModalReceipt = document.getElementById('btn-modal-receipt');
  const toastContainer = document.getElementById('toast-container');

  /* ==========================================================================
     3. Price Calculation & Order Summary Update
     ========================================================================== */
  function calculatePricing() {
    const plan = PLANS[state.selectedPlan];
    const subtotal = plan.basePrice;
    let discount = 0;

    if (state.appliedCoupon) {
      if (state.appliedCoupon.type === 'percent') {
        discount = subtotal * (state.appliedCoupon.value / 100);
      } else if (state.appliedCoupon.type === 'fixed') {
        discount = Math.min(state.appliedCoupon.value, subtotal);
      }
    }

    const estimatedTax = 0.00; // Transparent zero-tax for education promo
    const total = Math.max(0, subtotal - discount + estimatedTax);

    return {
      subtotal,
      discount,
      estimatedTax,
      total
    };
  }

  function updateOrderSummaryUI() {
    const plan = PLANS[state.selectedPlan];
    const pricing = calculatePricing();

    // Plan Box Details
    summaryPlanName.textContent = `StudyMate ${plan.name}`;
    summaryPlanBadge.textContent = plan.badgeText;
    summaryPlanCycle.textContent = plan.summaryCycle;
    summaryPlanBasePrice.textContent = `$${plan.basePrice.toFixed(2)}`;

    // Breakdown Rows
    breakdownSubtotal.textContent = `$${pricing.subtotal.toFixed(2)}`;

    if (pricing.discount > 0 && state.appliedCoupon) {
      breakdownDiscountRow.classList.remove('hidden');
      breakdownDiscountTag.textContent = state.appliedCoupon.label;
      breakdownDiscount.textContent = `-$${pricing.discount.toFixed(2)}`;
    } else {
      breakdownDiscountRow.classList.add('hidden');
    }

    breakdownTax.textContent = `$${pricing.estimatedTax.toFixed(2)}`;
    breakdownTotal.textContent = pricing.total.toFixed(2);
    summaryRecurNote.textContent = plan.recurNote;

    // Checkout Button Price Tag
    btnPricePreview.textContent = `($${pricing.total.toFixed(2)})`;
  }

  /* ==========================================================================
     4. Plan Selection Logic
     ========================================================================== */
  function selectPlan(planKey) {
    if (!PLANS[planKey]) return;
    state.selectedPlan = planKey;

    const isYearly = planKey === 'yearly';

    // Update Toggle Switch
    cycleToggleBtn.setAttribute('aria-checked', isYearly ? 'true' : 'false');
    if (isYearly) {
      labelYearly.classList.add('active');
      labelMonthly.classList.remove('active');
    } else {
      labelMonthly.classList.add('active');
      labelYearly.classList.remove('active');
    }

    // Update Plan Cards Active Classes
    if (isYearly) {
      planCardYearly.classList.add('active');
      planCardMonthly.classList.remove('active');
      
      btnSelectYearly.classList.add('active-btn');
      btnSelectYearly.innerHTML = '<span class="btn-text">Selected Plan</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="btn-check"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      
      btnSelectMonthly.classList.remove('active-btn');
      btnSelectMonthly.innerHTML = '<span class="btn-text">Select Monthly</span><span class="btn-arrow">→</span>';
    } else {
      planCardMonthly.classList.add('active');
      planCardYearly.classList.remove('active');

      btnSelectMonthly.classList.add('active-btn');
      btnSelectMonthly.innerHTML = '<span class="btn-text">Selected Plan</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="btn-check"><polyline points="20 6 9 17 4 12"></polyline></svg>';

      btnSelectYearly.classList.remove('active-btn');
      btnSelectYearly.innerHTML = '<span class="btn-text">Select Yearly (Save 40%)</span><span class="btn-arrow">→</span>';
    }

    updateOrderSummaryUI();
  }

  // Plan Click Handlers
  planCardMonthly.addEventListener('click', (e) => {
    e.preventDefault();
    selectPlan('monthly');
  });

  planCardYearly.addEventListener('click', (e) => {
    e.preventDefault();
    selectPlan('yearly');
  });

  btnSelectMonthly.addEventListener('click', (e) => {
    e.stopPropagation();
    selectPlan('monthly');
  });

  btnSelectYearly.addEventListener('click', (e) => {
    e.stopPropagation();
    selectPlan('yearly');
  });

  cycleToggleBtn.addEventListener('click', () => {
    const current = cycleToggleBtn.getAttribute('aria-checked') === 'true';
    selectPlan(current ? 'monthly' : 'yearly');
  });

  labelMonthly.addEventListener('click', () => selectPlan('monthly'));
  labelYearly.addEventListener('click', () => selectPlan('yearly'));

  /* ==========================================================================
     5. Payment Method Switcher
     ========================================================================= */
  paymentTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      paymentTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const radio = tab.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        state.selectedPaymentMethod = radio.value;
      }

      if (state.selectedPaymentMethod === 'card') {
        cardInputsPanel.classList.remove('hidden');
        altPaymentPanel.classList.add('hidden');
        btnCtaText.textContent = 'Complete Secure Upgrade';
      } else {
        cardInputsPanel.classList.add('hidden');
        altPaymentPanel.classList.remove('hidden');

        if (state.selectedPaymentMethod === 'paypal') {
          altProviderTitle.textContent = 'PayPal Express Checkout';
          altProviderDesc.textContent = 'You will be securely redirected to authenticate with your PayPal account and authorize subscription payments.';
          btnCtaText.textContent = 'Continue with PayPal';
        } else if (state.selectedPaymentMethod === 'googlepay') {
          altProviderTitle.textContent = 'Google Pay Quick Checkout';
          altProviderDesc.textContent = 'Your default Google Pay payment profile and card will be used for instant 1-click verification.';
          btnCtaText.textContent = 'Pay with Google Pay';
        }
      }
    });
  });

  /* ==========================================================================
     6. Card Brand Detection & Auto-Formatting
     ========================================================================== */
  function detectCardBrand(digits) {
    if (/^4/.test(digits)) return 'visa';
    if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)/.test(digits)) return 'mastercard';
    if (/^3[47]/.test(digits)) return 'amex';
    if (/^(6011|65|64[4-9]|622)/.test(digits)) return 'discover';
    return 'unknown';
  }

  function updateCardBrandBadge(brand) {
    if (brand === 'visa') {
      cardBrandIcon.innerHTML = '<span class="card-brand-logo-img brand-visa">VISA</span>';
    } else if (brand === 'mastercard') {
      cardBrandIcon.innerHTML = '<span class="card-brand-logo-img brand-mastercard">MC</span>';
    } else if (brand === 'amex') {
      cardBrandIcon.innerHTML = '<span class="card-brand-logo-img brand-amex">AMEX</span>';
    } else if (brand === 'discover') {
      cardBrandIcon.innerHTML = '<span class="card-brand-logo-img brand-discover">DISC</span>';
    } else {
      cardBrandIcon.innerHTML = '<span class="generic-card-badge">CARD</span>';
    }
  }

  // Format Card Number input with spaces
  inputCardNumber.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    const brand = detectCardBrand(value);
    updateCardBrandBadge(brand);

    let formatted = '';
    if (brand === 'amex') {
      // 4-6-5 formatting for AMEX
      value = value.substring(0, 15);
      if (value.length > 10) {
        formatted = `${value.slice(0, 4)} ${value.slice(4, 10)} ${value.slice(10)}`;
      } else if (value.length > 4) {
        formatted = `${value.slice(0, 4)} ${value.slice(4)}`;
      } else {
        formatted = value;
      }
    } else {
      // 4-4-4-4 formatting for standard cards
      value = value.substring(0, 16);
      const matches = value.match(/.{1,4}/g);
      formatted = matches ? matches.join(' ') : value;
    }

    e.target.value = formatted;
    validateField('cardNumber');
  });

  // Expiry Date Auto Slash MM / YY
  inputCardExpiry.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (value.length >= 2) {
      // Ensure month is between 01-12
      let mm = parseInt(value.substring(0, 2), 10);
      if (mm > 12) mm = 12;
      if (mm === 0) mm = 1;
      const mmStr = mm < 10 ? `0${mm}` : `${mm}`;
      const yyStr = value.substring(2);
      e.target.value = yyStr.length > 0 ? `${mmStr}/${yyStr}` : `${mmStr}/`;
    } else {
      e.target.value = value;
    }
    validateField('cardExpiry');
  });

  // Handle backspace gracefully in Expiry
  inputCardExpiry.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && inputCardExpiry.value.endsWith('/')) {
      inputCardExpiry.value = inputCardExpiry.value.slice(0, -1);
    }
  });

  // CVV Input formatting
  inputCardCvv.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    validateField('cardCvv');
  });

  /* ==========================================================================
     7. Live Validation Engine
     ========================================================================== */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function isValidLuhn(numberString) {
    const digits = numberString.replace(/\D/g, '');
    if (digits.length < 13 || digits.length > 19) return false;
    let sum = 0;
    let alternate = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let n = parseInt(digits[i], 10);
      if (alternate) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
      alternate = !alternate;
    }
    return sum % 10 === 0;
  }

  function isValidExpiry(expiryString) {
    if (!/^\d{2}\/\d{2}$/.test(expiryString)) return false;
    const parts = expiryString.split('/');
    const month = parseInt(parts[0], 10);
    const year = parseInt(`20${parts[1]}`, 10);

    if (month < 1 || month > 12) return false;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 1-indexed

    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    if (year > currentYear + 20) return false; // Sanity check

    return true;
  }

  function validateField(fieldName) {
    let isValid = true;

    switch (fieldName) {
      case 'fullName': {
        const val = inputFullName.value.trim();
        isValid = val.length >= 3;
        toggleFieldError(groupFullName, isValid);
        break;
      }

      case 'email': {
        const val = inputEmail.value.trim();
        isValid = isValidEmail(val);
        toggleFieldError(groupEmail, isValid);
        break;
      }

      case 'country': {
        const val = selectCountry.value;
        isValid = Boolean(val);
        toggleFieldError(groupCountry, isValid);
        break;
      }

      case 'cardNumber': {
        if (state.selectedPaymentMethod !== 'card') {
          toggleFieldError(groupCardNumber, true);
          return true;
        }
        const digits = inputCardNumber.value.replace(/\D/g, '');
        // Validate either by Luhn or sufficient realistic length
        isValid = digits.length >= 15 && isValidLuhn(digits);
        toggleFieldError(groupCardNumber, isValid);
        break;
      }

      case 'cardExpiry': {
        if (state.selectedPaymentMethod !== 'card') {
          toggleFieldError(groupCardExpiry, true);
          return true;
        }
        isValid = isValidExpiry(inputCardExpiry.value.trim());
        toggleFieldError(groupCardExpiry, isValid);
        break;
      }

      case 'cardCvv': {
        if (state.selectedPaymentMethod !== 'card') {
          toggleFieldError(groupCardCvv, true);
          return true;
        }
        const digits = inputCardCvv.value.replace(/\D/g, '');
        isValid = digits.length >= 3 && digits.length <= 4;
        toggleFieldError(groupCardCvv, isValid);
        break;
      }

      case 'terms': {
        isValid = termsCheckbox.checked;
        toggleFieldError(groupTerms, isValid);
        break;
      }
    }

    return isValid;
  }

  function toggleFieldError(groupElement, isValid) {
    if (!groupElement) return;
    if (isValid) {
      groupElement.classList.remove('has-error');
    } else {
      groupElement.classList.add('has-error');
    }
  }

  // Attach live listeners for inputs
  inputFullName.addEventListener('blur', () => validateField('fullName'));
  inputFullName.addEventListener('input', () => {
    if (groupFullName.classList.contains('has-error')) validateField('fullName');
  });

  inputEmail.addEventListener('blur', () => validateField('email'));
  inputEmail.addEventListener('input', () => {
    if (groupEmail.classList.contains('has-error')) validateField('email');
  });

  selectCountry.addEventListener('change', () => validateField('country'));
  termsCheckbox.addEventListener('change', () => validateField('terms'));

  /* ==========================================================================
     8. Coupon Engine Logic
     ========================================================================== */
  function applyCouponCode() {
    const rawCode = inputCoupon.value.trim().toUpperCase();

    if (!rawCode) {
      showCouponMessage('Please enter a coupon code.', 'error');
      return;
    }

    if (COUPONS[rawCode]) {
      state.appliedCoupon = {
        code: rawCode,
        ...COUPONS[rawCode]
      };

      pillCodeText.textContent = rawCode;
      pillDiscountText.textContent = `(${state.appliedCoupon.label})`;
      activeCouponPill.classList.remove('hidden');
      inputCoupon.value = '';
      showCouponMessage(`Coupon "${rawCode}" applied successfully!`, 'success');
      showToast(`🎉 Applied ${state.appliedCoupon.label} discount!`, 'success');

      updateOrderSummaryUI();
    } else {
      showCouponMessage('Invalid or expired coupon code. Try STUDY20 or PRO50.', 'error');
      showToast('❌ Invalid coupon code', 'error');
    }
  }

  function removeCouponCode() {
    state.appliedCoupon = null;
    activeCouponPill.classList.add('hidden');
    couponFeedback.textContent = '';
    couponFeedback.className = 'coupon-feedback';
    showToast('Coupon removed', 'info');
    updateOrderSummaryUI();
  }

  function showCouponMessage(msg, type) {
    couponFeedback.textContent = msg;
    couponFeedback.className = `coupon-feedback ${type}`;
  }

  btnApplyCoupon.addEventListener('click', applyCouponCode);
  inputCoupon.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyCouponCode();
    }
  });

  btnRemoveCoupon.addEventListener('click', removeCouponCode);

  /* ==========================================================================
     9. Toast Notification Helper
     ========================================================================== */
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  /* ==========================================================================
     10. Form Submission & Payment Processing Simulation
     ========================================================================== */
  function validateAllFields() {
    let allValid = true;

    const fieldsToValidate = ['fullName', 'email', 'country', 'terms'];
    if (state.selectedPaymentMethod === 'card') {
      fieldsToValidate.push('cardNumber', 'cardExpiry', 'cardCvv');
    }

    fieldsToValidate.forEach((field) => {
      const valid = validateField(field);
      if (!valid) allValid = false;
    });

    return allValid;
  }

  btnSubmitCheckout.addEventListener('click', (e) => {
    e.preventDefault();
    if (state.isSubmitting) return;

    const isValid = validateAllFields();

    if (!isValid) {
      // Find first invalid input and focus it with shake animation
      const firstErrorGroup = document.querySelector('.form-group.has-error, .terms-group.has-error');
      if (firstErrorGroup) {
        firstErrorGroup.classList.add('shake');
        setTimeout(() => firstErrorGroup.classList.remove('shake'), 500);

        const inputToFocus = firstErrorGroup.querySelector('input, select');
        if (inputToFocus) inputToFocus.focus();
      }

      showToast('⚠️ Please correct the errors in the form.', 'error');
      return;
    }

    // Begin Checkout Simulation
    startCheckoutProcessing();
  });

  function startCheckoutProcessing() {
    state.isSubmitting = true;
    btnSubmitCheckout.disabled = true;
    checkoutSpinner.classList.remove('hidden');
    btnLockSvg.classList.add('hidden');
    btnPricePreview.classList.add('hidden');
    btnCtaText.textContent = 'Processing Payment with Bank...';

    // Simulate secure network transaction delay (1.8s)
    setTimeout(() => {
      finishSuccessfulPayment();
    }, 1800);
  }

  function generateOrderId() {
    const randomHex = Math.floor(100000 + Math.random() * 900000);
    return `SM-${randomHex}-PRO`;
  }

  function finishSuccessfulPayment() {
    const pricing = calculatePricing();
    const plan = PLANS[state.selectedPlan];
    const orderId = generateOrderId();
    const customerName = inputFullName.value.trim();
    const customerEmail = inputEmail.value.trim();
    const subscriptionDate = new Date();
    const expirationDate = new Date();

    if (state.selectedPlan === 'yearly') {
      expirationDate.setFullYear(subscriptionDate.getFullYear() + 1);
    } else {
      expirationDate.setMonth(subscriptionDate.getMonth() + 1);
    }

    // Pro User Record
    const proSubscriptionData = {
      isPro: true,
      planId: plan.id,
      planName: plan.name,
      billingCycle: plan.cycleText,
      amountPaid: pricing.total.toFixed(2),
      orderId: orderId,
      customerName: customerName,
      customerEmail: customerEmail,
      paymentMethod: state.selectedPaymentMethod,
      subscribedAt: subscriptionDate.toISOString(),
      expiresAt: expirationDate.toISOString(),
      unlockedFeatures: [
        'unlimited_ai_queries',
        'step_by_step_solver',
        'exam_simulator',
        'ai_voice_companion',
        'weak_area_diagnostics',
        'priority_models'
      ]
    };

    // Save to LocalStorage for NOVIX compatibility
    try {
      localStorage.setItem('studyMateProStatus', JSON.stringify(proSubscriptionData));
      localStorage.setItem('isPro', 'true');
      localStorage.setItem('studyMate_user_tier', 'pro');
      
      // Update or set studyMateUser profile
      let currentUser = {};
      try {
        const storedUser = localStorage.getItem('studyMateUser');
        if (storedUser) currentUser = JSON.parse(storedUser);
      } catch (err) {
        currentUser = {};
      }
      currentUser.isPro = true;
      currentUser.tier = 'Pro';
      currentUser.email = customerEmail;
      currentUser.name = customerName;
      localStorage.setItem('studyMateUser', JSON.stringify(currentUser));
    } catch (storageErr) {
      console.warn('LocalStorage save failed:', storageErr);
    }

    // Populate Modal Details
    modalOrderId.textContent = orderId;
    modalPlanName.textContent = `${plan.name} ($${pricing.total.toFixed(2)})`;
    modalUserEmail.textContent = customerEmail;
    modalAmountPaid.textContent = `$${pricing.total.toFixed(2)}`;

    // Reset button state
    state.isSubmitting = false;
    btnSubmitCheckout.disabled = false;
    checkoutSpinner.classList.add('hidden');
    btnLockSvg.classList.remove('hidden');
    btnPricePreview.classList.remove('hidden');
    btnCtaText.textContent = 'Complete Secure Upgrade';

    // Show Success Modal with Animation
    successModal.classList.remove('hidden');

    // Trigger auto-redirect countdown
    startRedirectCountdown();
  }

  function startRedirectCountdown() {
    let secondsLeft = 5;
    redirectCounter.textContent = secondsLeft;

    if (state.redirectTimer) clearInterval(state.redirectTimer);

    state.redirectTimer = setInterval(() => {
      secondsLeft -= 1;
      redirectCounter.textContent = secondsLeft;

      if (secondsLeft <= 0) {
        clearInterval(state.redirectTimer);
        window.location.href = 'dashboard.html';
      }
    }, 1000);
  }

  // Modal Action Buttons
  btnModalDashboard.addEventListener('click', () => {
    if (state.redirectTimer) clearInterval(state.redirectTimer);
    window.location.href = 'dashboard.html';
  });

  btnModalReceipt.addEventListener('click', () => {
    const pricing = calculatePricing();
    const plan = PLANS[state.selectedPlan];
    const orderId = modalOrderId.textContent;
    const email = modalUserEmail.textContent;

    const receiptContent = `
========================================
       NOVIX - OFFICIAL INVOICE
========================================
Receipt Reference: ${orderId}
Date: ${new Date().toLocaleDateString()}
Status: PAID (Confirmed)

Customer Email: ${email}
Plan: StudyMate ${plan.name}
Billing Cycle: ${plan.summaryCycle}

Subtotal: $${pricing.subtotal.toFixed(2)}
Discount: -$${pricing.discount.toFixed(2)}
Estimated Tax: $0.00
TOTAL AMOUNT: $${pricing.total.toFixed(2)}

Payment Method: ${state.selectedPaymentMethod.toUpperCase()}
Authorized via: 256-Bit TLS Bank Gateway

Thank you for choosing NOVIX!
Access your dashboard anytime at dashboard.html
========================================
    `.trim();

    // Create downloadable receipt file
    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `StudyMate_Receipt_${orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('📄 Invoice downloaded successfully!', 'success');
  });

  /* ==========================================================================
     11. Initialize Page State & Check Pre-existing User Data
     ========================================================================== */
  function init() {
    // Select default plan
    selectPlan('yearly');

    // Pre-fill user details from localStorage if already logged in
    try {
      const storedUser = localStorage.getItem('studyMateUser');
      if (storedUser) {
        const userObj = JSON.parse(storedUser);
        if (userObj.name && !inputFullName.value) inputFullName.value = userObj.name;
        if (userObj.email && !inputEmail.value) inputEmail.value = userObj.email;
        if (userObj.isPro && userTierBadge) {
          userTierBadge.innerHTML = '<span class="status-dot" style="background:#10b981;box-shadow:0 0 8px #10b981"></span><span>Current: <strong>Pro Member</strong></span>';
        }
      }
    } catch (e) {
      // Graceful fallback
    }

    // Default country selection
    if (!selectCountry.value) {
      selectCountry.value = 'US';
    }
  }

  init();
});
