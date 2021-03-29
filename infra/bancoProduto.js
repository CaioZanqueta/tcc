//Produto

function bancoProduto(conexao) {
	this._conexao = conexao;
};

bancoProduto.prototype.salva = function(dados,callback) {
	this._conexao.query('insert into produto set ?',dados, callback);
};

bancoProduto.prototype.buscaGeral = function(callback) {
	this._conexao.query('select * from produto', callback);
};

bancoProduto.prototype.busca = function(id,callback) {
	this._conexao.query('select * from produto where id_produto = ?',id,callback);
};

bancoProduto.prototype.buscaNome = function(dados,callback) {
	console.log('Função do banco',dados);
	this._conexao.query('select p.id_produto, p.tipo_produto, p.lote_produto, p.produto, p.mercado, p.valor_produto, consulta1.menor'
	+ ' from produto p INNER JOIN (select produto, MIN(valor_produto) as menor from produto c group by produto)'
	+ ' as consulta1 ON p.valor_produto = consulta1.menor where p.produto = ?',dados, callback);
}

bancoProduto.prototype.editar = function(dados,callback){
	this._conexao.query('UPDATE produto SET ? WHERE id_produto = ?',[dados,dados.id_produto],callback);
};

module.exports = function() {
	return bancoProduto;
};

//Fim produto