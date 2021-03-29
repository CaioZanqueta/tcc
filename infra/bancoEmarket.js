//Cliente

function clienteBanco(conexao) {
	this._conexao = conexao;
};

clienteBanco.prototype.salva = function(dados,callback) {
	this._conexao.query('insert into cliente set ?',dados, callback);
};

clienteBanco.prototype.buscaGeral = function(callback) {
	this._conexao.query('select * from cliente', callback);
};

clienteBanco.prototype.busca = function(id,callback) {
	this._conexao.query('select * from cliente where idcliente = ?',id,callback);
};

clienteBanco.prototype.editar = function(dados,callback){
	this._conexao.query('UPDATE cliente SET ? WHERE idcliente=?',[dados,dados.idcliente],callback);
};

clienteBanco.prototype.login = function(dados,callback){
	this._conexao.query('SELECT * FROM cliente WHERE email_cliente = ? AND senha_cliente = ?', [dados.email_cliente, dados.senha_cliente], callback);
};

module.exports = function() {
	return clienteBanco;
};

//Fim cliente