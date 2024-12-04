// cypress/e2e/app.cy.js
describe('App Tests', () => {
  
  // Home Page Tests
  describe('Home Page', () => {
    it('should navigate to order page on order button click', () => {
      cy.visit('/'); 
      cy.get('.order-btn', { timeout: 10000 }) 
        .should('be.visible') 
        .click(); 
      cy.url().should('include', '/order'); 
    });
  });
  
  // Order Page Tests
  describe('Order Page', () => {
    beforeEach(() => {
      cy.visit('/order'); 
    });

    it('should render pizza details and form elements', () => {
      cy.get('.pizza-info h2').should('contain.text', 'Position Absolute Acı Pizza'); 
      cy.get('.order-form').should('exist'); 
      cy.get('input[type="radio"]').should('have.length', 3); 
      cy.get('select[name="crust"]').should('exist'); 
      cy.get('input[type="checkbox"]').should('exist'); 
    });

    it('should validate name field', () => {
      cy.get('input[name="name"]').should('be.empty'); 
      cy.get('.order-form').submit(); 
      cy.get('.error').should('contain.text', 'İsim en az 3 karakter olmalıdır.'); 
    });

    it('should validate size selection', () => {
      cy.get('.order-form').submit(); 
      cy.get('.error').should('contain.text', 'Pizza boyutunu seçmelisiniz.'); 
    });

    it('should validate topping selection', () => {
      cy.get('input[name="size"]').check('Küçük'); 
      cy.get('.order-form').submit(); 
      cy.get('.error').should('contain.text', 'En az 4 ve en fazla 10 malzeme seçmelisiniz.'); 
    });
  });

  // Success Page Tests
  describe('Success Page', () => {
    it('should render success message and link to homepage', () => {
      cy.visit('/success'); 
      cy.get('.success-title').should('contain.text', 'Teknolojik Yemekler'); 
      cy.get('.success-subtitle').should('contain.text', 'TEBRİKLER! SİPARİŞİNİZ ALINDI!'); 
      cy.get('.success-link').should('contain.text', 'Anasayfaya Dön'); 
      cy.get('.success-link').should('have.attr', 'href', '/'); 
    });
  });
});
