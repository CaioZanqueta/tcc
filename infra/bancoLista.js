//Lista

function listaBanco(conexao) {
	this._conexao = conexao;
};

listaBanco.prototype.salva = function(dados,callback) {
	this._conexao.query('insert into lista set ?',dados, callback);
};

listaBanco.prototype.buscaGeral = function(callback) {
	this._conexao.query('select * from lista', callback);
};

listaBanco.prototype.busca = function(id,callback) {
	this._conexao.query('select * from lista where idlista = ?',id,callback);
};

listaBanco.prototype.editar=function(dados,callback){
	this._conexao.query('UPDATE lista SET ? WHERE idlista=?',[dados,dados.idlista],callback);
};

module.exports = function() {
	return listaBanco;
};

//Fim lista