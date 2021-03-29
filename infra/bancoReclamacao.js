//Reclamação

function bancoReclamacao(conexao) {
	this._conexao = conexao;
};

bancoReclamacao.prototype.salva = function(dados,callback) {
	this._conexao.query('insert into reclamacao set ?',dados, callback);
};

bancoReclamacao.prototype.buscaGeral = function(callback) {
	this._conexao.query('select * from reclamacao', callback);
};

bancoReclamacao.prototype.busca = function(id,callback) {
	this._conexao.query('select * from reclamacao where id_reclamacao = ?',id,callback);
};

bancoReclamacao.prototype.editar = function(dados,callback){
	this._conexao.query('UPDATE reclamacao SET ? WHERE id_reclamacao = ?',[dados,dados.id_reclamacao],callback);
};

module.exports = function() {
	return bancoReclamacao;
};

//Fim reclamação