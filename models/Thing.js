class Thing {
  static client = null;
  static tableName = "things";
  static attributes = {
    body: "string",
    authhor: "string",
  };

  static async create(values) {
    const arrAttrs = Object.entries(this.attributes)
      .filter(([attr, domain]) => attr in values)
      .map(([attr, domain]) => attr); //[body, author]

    const insertAttrStr = arrAttrs.map((attr) => `"${attr}"`).join(",");
    const insertValuesStr = arrAttrs
      .map((attr) => {
        const value = values[attr];
        return typeof value === "string" ? `'${value}'` : value;
      })
      .join(",");

    const { rows } = await this.client.query(`
        INSERT INTO ${this.tableName}(${insertAttrStr})
        VALUES (${insertValuesStr})
        RETURNING *;`);
    return rows;
  }
  static async findAll() {
    const { rows } = await this.client.query(`
        SELECT * 
        FROM ${this.tableName};`);
    return rows;
  }
  static async findByPk(pkValue) {
    const { rows } = await this.client.query(`
        SELECT * 
        FROM ${this.tableName} 
        WHERE "id"=${pkValue};`);
    return rows;
  }
  static async updateByPk(values, pkValue) {
    const arrAttrs = Object.entries(values).map(([attr, domain]) => attr);
    const updateAttrStr = arrAttrs.map((attr) => attr);
    const updateValuesStr = arrAttrs.map((attr) => {
      const value = values[attr];
      return typeof value === "string"
        ? `"${updateAttrStr}" =  '${value}'`
        : `${updateAttrStr} =  ${value}`;
    });
    const { rows } = await this.client.query(`
        UPDATE ${this.tableName}
        SET ${updateValuesStr}
        WHERE "id" = ${pkValue}
        RETURNING *;`);
    return rows;
  }
  static async deleteByPk(pkValue) {
    const { rows } = await this.client.query(`
        DELETE
        FROM ${this.tableName} 
        WHERE "id"=${pkValue}
        RETURNING *;`);
    return rows;
  }
}

module.exports = Thing;
