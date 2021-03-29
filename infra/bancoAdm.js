//ADM

function admBanco(conexao) {
	this._conexao = conexao;
};

admBanco.prototype.login=function(dados,callback){
	this._conexao.query('SELECT * FROM adm WHERE email_adm = ? AND senha_adm = ?', [dados.email_adm, dados.senha_adm], callback);
};

module.exports = function() {
	return admBanco;
};

//Fim ADM