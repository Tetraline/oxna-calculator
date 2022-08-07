describe("empty spec", () => {
  it("should check that 100-50 = 50", () => {
    // 1. Arrange
    cy.visit("http://192.168.0.94:5500/index.html");

    // 2. Act
    cy.get('[value="1"]').click();
    cy.get('[value="0"]').click();
    cy.get('[value="0"]').click();
    cy.get('[value="-"]').click();
    cy.get('[value="5"]').click();
    cy.get('[value="0"]').click();
    cy.get('[value="="]').click();
    // 3. Assert
    // Check the upper screen says '2*2+8*2='
    // Chedk the lower screen says '20'
    cy.get(".screen__lower").should("contain", "50");
    cy.get(".screen__upper").should("contain", "100+-50=");
  });

  it("should check that 100/50 = 2", () => {
    // 1. Arrange
    cy.visit("http://192.168.0.94:5500/index.html");

    // 2. Act
    cy.get('[value="1"]').click();
    cy.get('[value="0"]').click();
    cy.get('[value="0"]').click();
    cy.get('[value="/"]').click();
    cy.get('[value="5"]').click();
    cy.get('[value="0"]').click();
    cy.get('[value="="]').click();
    // 3. Assert
    // Check the upper screen says '2*2+8*2='
    // Chedk the lower screen says '20'
    cy.get(".screen__lower").should("contain", "2");
    cy.get(".screen__upper").should("contain", "100/50=");
  });

  it("should check that 100+50 = 150", () => {
    // 1. Arrange
    cy.visit("http://192.168.0.94:5500/index.html");

    // 2. Act
    cy.get('[value="1"]').click();
    cy.get('[value="0"]').click();
    cy.get('[value="0"]').click();
    cy.get('[value="+"]').click();
    cy.get('[value="5"]').click();
    cy.get('[value="0"]').click();
    cy.get('[value="="]').click();
    // 3. Assert
    // Check the upper screen says '2*2+8*2='
    // Chedk the lower screen says '20'
    cy.get(".screen__lower").should("contain", "150");
    cy.get(".screen__upper").should("contain", "100+50=");
  });
  it("should check that 100*50 = 5000", () => {
    // 1. Arrange
    cy.visit("http://192.168.0.94:5500/index.html");

    // 2. Act
    cy.get('[value="1"]').click();
    cy.get('[value="0"]').click();
    cy.get('[value="0"]').click();
    cy.get('[value="*"]').click();
    cy.get('[value="5"]').click();
    cy.get('[value="0"]').click();
    cy.get('[value="="]').click();
    // 3. Assert
    // Check the upper screen says '2*2+8*2='
    // Chedk the lower screen says '20'
    cy.get(".screen__lower").should("contain", "5000");
    cy.get(".screen__upper").should("contain", "100*50=");
  });
  it("should check that 2*2+8*2 = 20", () => {
    // 1. Arrange
    cy.visit("http://192.168.0.94:5500/index.html");

    // 2. Act
    cy.get('[value="2"]').click();
    cy.get('[value="*"]').click();
    cy.get('[value="2"]').click();
    cy.get('[value="+"]').click();
    cy.get('[value="8"]').click();
    cy.get('[value="*"]').click();
    cy.get('[value="2"]').click();
    cy.get('[value="="]').click();
    // 3. Assert
    // Check the upper screen says '2*2+8*2='
    // Chedk the lower screen says '20'
    cy.get(".screen__lower").should("contain", "20");
    cy.get(".screen__upper").should("contain", "2*2+8*2");
  });
  it("should check that 2..2*2..2 = NaN", () => {
    // 1. Arrange
    cy.visit("http://192.168.0.94:5500/index.html");

    // 2. Act
    // 1. Arrange
    cy.visit("http://192.168.0.94:5500/index.html");

    // 2. Act
    cy.get('[value="2"]').click();
    cy.get('[value="."]').click();
    cy.get('[value="."]').click();
    cy.get('[value="2"]').click();
    cy.get('[value="*"]').click();
    cy.get('[value="2"]').click();
    cy.get('[value="."]').click();
    cy.get('[value="."]').click();
    cy.get('[value="2"]').click();
    cy.get('[value="="]').click();
    // 3. Assert
    // Check the upper screen says '2*2+8*2='
    // Chedk the lower screen says '20'
    cy.get(".screen__lower").should("contain", "NaN");
  });
  it("should check that 2*(2+8)*2 = 40", () => {
    // 1. Arrange
    cy.visit("http://192.168.0.94:5500/index.html");
    cy.viewport(1920, 1080);

    // 2. Act
    // 1. Arrange
    cy.visit("http://192.168.0.94:5500/index.html");

    // 2. Act
    cy.get('[value="2"]').click();
    cy.get('[value="*"]').click();
    cy.get('[value="2"]').click();
    cy.get('[value="+"]').click();
    cy.get('[value="8"]').click();
    cy.get('[value="*"]').click();
    cy.get('[value="2"]').click();
    cy.get('[value="="]').click();
    // 3. Assert
    // Check the upper screen says '2*2+8*2='
    // Chedk the lower screen says '20'
    cy.get(".screen__lower").should("contain", "20");
    cy.get(".screen__upper").should("contain", "2*2+8*2");
    cy.get('[value="2"]').click();
    cy.get('[value="*"]').click();
    cy.get('[value="("]').click();
    cy.get('[value="2"]').click();
    cy.get('[value="+"]').click();
    cy.get('[value="8"]').click();
    cy.get('[value=")"]').click();
    cy.get('[value="*"]').click();
    cy.get('[value="2"]').click();
    cy.get('[value="="]').click();
    // 3. Assert
    // Check the upper screen says '2*2+8*2='
    // Chedk the lower screen says '20'
    cy.get(".screen__lower").should("contain", "40");
    cy.get(".screen__upper").should("contain", "2*(2+8)*2");
  });

  it("Check that array 3 is given the right class when clicked", () => {
    // 1. Arrange
    cy.visit("http://192.168.0.94:5500/index.html");

    // 2. Act
    cy.get(".buttons__array-3").click();

    // 3. Assert
    cy.get(".buttons__array-3").should("have.class", "buttons__array-3--open");
  });
});
