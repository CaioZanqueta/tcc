//Mercado

function mercadoBanco(conexao) {
	this._conexao = conexao;
};

mercadoBanco.prototype.salva = function(dados,callback) {
	this._conexao.query('insert into mercado set ?',dados, callback);
};

mercadoBanco.prototype.buscaGeral = function(callback) {
	this._conexao.query('select * from mercado', callback);
};

mercadoBanco.prototype.busca = function(id,callback) {
	this._conexao.query('select * from mercado where idmercado = ?',id,callback);
};

mercadoBanco.prototype.editar=function(dados,callback){
	this._conexao.query('UPDATE mercado SET ? WHERE idmercado=?',[dados,dados.idmercado],callback);
};

mercadoBanco.prototype.login=function(dados,callback){
	this._conexao.query('SELECT * FROM mercado WHERE email_mercado = ? AND senha_mercado = ?', [dados.email_mercado, dados.senha_mercado], callback);
};

module.exports = function() {
	return mercadoBanco;
};