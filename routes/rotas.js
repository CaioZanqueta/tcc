module.exports = (app) => {

	var md5 = require('md5');

	//Home

	app.get('/',(req,res) => {
		var sess = req.session;
		sess.logado;
		res.render('index.ejs',{'logado':sess.logado});
	});

	app.get('/adm',(req,res) => {
		var sess = req.session;
		if(sess.logado){
			if(sess.logado != 2){
				res.redirect('/logarAdm');
			}else{
				res.render('indexAdm.ejs');
			}
		}else{
			res.redirect('/logarAdm');
		}
	});

	//Fim home

	//Lista

	app.get('/lista',(req,res) => {
		var sess = req.session;
		if(sess.logado){
			if(sess.logado != 1){
				res.redirect('/logar');
			}else{
				res.render('lista.ejs');
			}
		}else{
			res.redirect('/logar');
		}
	});

	//Fim lista

	//Função principal

	 /**app.post('/gerar',(req,res) => {
		var dados = req.body.produto;
		console.log(req.body);
		var resultado = [];
		var x = 0;
		var conexao = app.infra.conexao();
		var bancoProduto = new app.infra.bancoProduto(conexao);
		console.log(Array.isArray(dados));
		if(dados.length == 1){
			bancoProduto.buscaNome(dados, (erro, resposta) => {
				
				if(erro){
					console.log(erro);
				} else {
					console.log(resposta);
					resultado[x] = {
						'id_produto':resposta[0].id_produto,
						'tipo_produto':resposta[0].tipo_produto,
						'lote_produto':resposta[0].lote_produto,
						'produto':resposta[0].produto,
						'mercado':resposta[0].mercado,
						'valor_produto':resposta[0].valor_produto,
						'menor':resposta[0].menor
					}

					x++;
					console.log('x',x);
					console.log('resposta',resposta.length);
					if(x == dados.length){
						console.log('Resultado que está indo para render ', resultado);
						res.render('gerar.ejs',{'busca':resultado});
					}
				}
			});  

			} else{
				console.log(dados.length);
				for(i = 0; i < dados.length; i++){
					bancoProduto.buscaNome(dados[i], (erro,resposta) => {
						 
						if (erro) {
							console.log(erro);
						}else{
							console.log(resposta[0]);
							resultado[x] = {
								'id_produto':resposta[0].id_produto,
								'tipo_produto':resposta[0].tipo_produto,
								'lote_produto':resposta[0].lote_produto,
								'produto':resposta[0].produto,
								'mercado':resposta[0].mercado,
								'valor_produto':resposta[0].valor_produto,
								'menor':resposta[0].menor
							}

							x++;
		
							if(x == dados.length){
								console.log('Resultado que está indo para render ', resultado);
								res.render('gerar.ejs',{'busca':resultado});
							}
						}
					});
				}

			}
	});*/

	app.post('/gerar',(req,res) => {
		var dados = req.body.produto;
		console.log(req.body);
		var resultado = [];
		var x = 0;
		var conexao = app.infra.conexao();
		var bancoProduto = new app.infra.bancoProduto(conexao);
		console.log(Array.isArray(dados));
		if(!(Array.isArray(dados))){
			bancoProduto.buscaNome(dados, (erro, resposta) => {
				
				if(erro){
					console.log(erro);
				} else {
					console.log(resposta);
					resultado[x] = {
						'id_produto':resposta[0].id_produto,
						'tipo_produto':resposta[0].tipo_produto,
						'lote_produto':resposta[0].lote_produto,
						'produto':resposta[0].produto,
						'mercado':resposta[0].mercado,
						'valor_produto':resposta[0].valor_produto,
						'menor':resposta[0].menor
					}

					x++;
					console.log('x',x);
					console.log('resposta',resposta.length);
					if(x == resposta.length){
						console.log('Resultado que está indo para render ', resultado);
						res.render('gerar2.ejs',{'busca':resultado});
					}
				}
			});  

			} else{
				console.log(dados.length);
				for(i = 0; i < dados.length; i++){
					bancoProduto.buscaNome(dados[i], (erro,resposta) => {
						 
						if (erro) {
							console.log(erro);
						}else{
							console.log(resposta[0]);
							resultado[x] = {
								'id_produto':resposta[0].id_produto,
								'tipo_produto':resposta[0].tipo_produto,
								'lote_produto':resposta[0].lote_produto,
								'produto':resposta[0].produto,
								'mercado':resposta[0].mercado,
								'valor_produto':resposta[0].valor_produto,
								'menor':resposta[0].menor
							}

							x++;
		
							if(x == dados.length){
								console.log('Resultado que está indo para render ', resultado);
								res.render('gerar.ejs',{'busca':resultado});
							}
						}
					});
				}

			}
	});

	//Fim função principal

	//Cadastro cliente

	app.get('/cadastrar',(req,res) => {
		res.render('cadastrar.ejs');
	});

	app.post('/cadastrar',(req,res) => {
		var dados = req.body;
		dados.senha_cliente = md5(dados.senha_cliente);
		var conexao = app.infra.conexao();
		var clienteBanco = new app.infra.bancoEmarket(conexao);
		clienteBanco.salva(dados, (erro,resposta) => {
			if (erro) {
				console.log(erro);
				res.render('cadastrar.ejs');
			}else{
				res.render('login.ejs'); 
			}
			console.log("Cadastrado com sucesso");
			console.log(dados);
		});
	});

	//Fim cadastro cliente

	//Login cliente

	app.get('/logar',(req,res) => {
		res.render('login.ejs');
	});

	app.post('/logar', (req, res) => {
		var sess = req.session; 
		var conexao = app.infra.conexao();
		var clienteBanco = new app.infra.bancoEmarket(conexao);
		var dados = req.body;
		if (dados.email_cliente && dados.senha_cliente) {
			dados.senha_cliente = md5(dados.senha_cliente);
			clienteBanco.login(dados, (erro,resposta) => {
				if(erro){
					console.log(erro);
				}else{
					if(resposta.length){
						sess.logado = 1;
						res.render('index.ejs',{'logado':sess.logado});
					}else{
						res.redirect('/logar');	
					}
				}
			});
		} else {
			response.send('Please enter Username and Password!');
			response.end();
		}
	});

	//Fim login cliente

	//Cadastro produto

	app.get('/produto', (req,res) => {
		var sess = req.session;
		if(sess.logado){
			if(sess.logado == 3 || sess.logado == 2){
				res.render('cadastrarProduto.ejs');
			}else{
				res.redirect('/');
			}
		}else{
			res.redirect('/logarAdm');
		}
	});

	app.post('/produto', (req,res) => {
		var dados = req.body;
		var conexao = app.infra.conexao();
		var bancoProduto = new app.infra.bancoProduto(conexao);
		bancoProduto.salva(dados, (erro,resposta) => {
			if (erro) {
				console.log(erro);
			}else{
				res.redirect('/listarProduto');
			}
			console.log("Cadastrado com sucesso");
			console.log(dados);
		});
	});

	//Fim cadastro produto

	//Listar produto

	app.get('/listarProduto', (req,res) => {
		var conexao = app.infra.conexao();
		var bancoProduto = new app.infra.bancoProduto(conexao);
		bancoProduto.buscaGeral( (erro,resposta) => {
			if (erro) {
				console.log(erro);
			}else{
				console.log(resposta);
				res.render('listarProduto.ejs',{'busca':resposta});
			}
		});
	});

	//Fim listar produto

	//Editar produto

	app.get('/buscaEditarproduto/:id', (req,res) => {
		var id = req.params.id;
		var conexao = app.infra.conexao();
		var produtoBanco = new app.infra.bancoProduto(conexao);
		produtoBanco.busca(id, (erro,resposta) => {
			if (erro) {
				console.log(erro);
			}else{
				res.render('formEditarproduto.ejs',{'busca':resposta});
			}
		});
	});

	app.post('/editarProduto', (req,res) => {
		var dados = req.body;
		var conexao = app.infra.conexao();
		var produtoBanco = new app.infra.bancoProduto(conexao);
		produtoBanco.editar(dados, (erro,resposta) => {
			if(erro){
				console.log(erro);
			}else{
				res.redirect('/listarProduto')
			};		
		});
	});

	//Fim editar produto

	//Login adm

	app.get('/logarAdm', (req,res) => {
		res.render('loginAdm.ejs');
	});

	app.post('/logarAdm', (req, res) => {
		var sess = req.session; 
		var conexao = app.infra.conexao();
		var admBanco = new app.infra.bancoAdm(conexao);
		var dados = req.body;
		if (dados.email_adm && dados.senha_adm) {
			dados.senha_adm = md5(dados.senha_adm);
			admBanco.login(dados, (erro,resposta) => {
				if(erro){
					console.log(erro);
				}else{
					if(resposta.length){
						sess.logado = 2;
						res.render('indexAdm.ejs',{'logado':sess.logado});	//chega neste ponto se encontrar um usuário no banco com email e senha válidos
					}else{
						res.redirect('/logarAdm');	//chega neste ponto se não encontrar usuário válido no banco de dados
					}
				}
			});
		} else {
			response.send('Please enter Username and Password!');
			response.end();
		}
	});

	//Fim login adm

	//Exibir mercados

	app.get('/san', (req,res) => {
		var sess = req.session;
		sess.logado;
		res.render('san.ejs',{'logado':sess.logado});
	});

	app.get('/sonda', (req,res) => {
		var sess = req.session;
		sess.logado;
		res.render('sonda.ejs',{'logado':sess.logado});
	});

	app.get('/vencedor', (req,res) => {
		var sess = req.session;
		sess.logado;
		res.render('vencedor.ejs',{'logado':sess.logado});
	});

	//Fim exibir mercados

	//Cadastro Mercado
	
	app.get('/cadastrarMercado', (req,res) => {
		var sess = req.session;
		if(sess.logado){
			if(sess.logado != 2 || sess.logado == 1){
				res.redirect('/');
			}else{
				res.render('cadastrarMercado.ejs');
			}
		}else{
			res.redirect('/logarAdm');
		}
	});

	app.post('/cadastrarMercado', (req,res) => {
		var dados = req.body;
		dados.senha_mercado = md5(dados.senha_mercado);
		var conexao = app.infra.conexao();
		var mercadoBanco = new app.infra.bancoMercado(conexao);
		mercadoBanco.salva(dados, (erro,resposta) => {
			if (erro) {
				console.log(erro);
			}else{
				res.render('loginMercado.ejs'); 
			}
			console.log("Cadastrado com sucesso");
			console.log(dados);
		});
	});

	// Fim cadastro mercado

	//Login mercado

	app.get('/logarMercado', (req,res) => {
		var sess = req.session;
		if(sess.logado){
			if(sess.logado != 2 || sess.logado == 1){
				res.redirect('/');
			}else{
				res.render('loginMercado.ejs');
			}
		}else{
			res.redirect('/logarAdm');
		}
	});

	app.post('/logarMercado', (req, res) => {
		var sess = req.session; 
		var conexao = app.infra.conexao();
		var mercadoBanco = new app.infra.bancoMercado(conexao);
		var dados = req.body;
		if (dados.email_mercado && dados.senha_mercado) {
			dados.senha_mercado = md5(dados.senha_mercado);
			mercadoBanco.login(dados, (erro,resposta) => {
				if(erro){
					console.log(erro);
				}else{
					if(resposta.length){
						sess.logado = 3;
						res.render('cadastrarProduto.ejs',{'logado':sess.logado});	//chega neste ponto se encontrar um usuário no banco com email e senha válidos
					}else{
						res.redirect('/logarMercado');	//chega neste ponto se não encontrar usuário válido no banco de dados
					}
				}
			});
		} else {
			response.send('Please enter Username and Password!');
			response.end();
		}
	});

	//Fim login mercado

	//Logout

	app.get('/logout', (req,res) => {
		var sess = req.session;
		if(sess.logado){
			if(sess.logado == 1 || sess.logado == 2 || sess.logado == 3){
				sess.logado = 0;
				res.redirect('/');
			}
		}
	});

	//Fim logout

	//Reclamações

	app.get('/reclamacaoCd',(req,res) => {
		var sess = req.session;
		sess.logado;
		res.render('cadastrarReclamacao.ejs',{'logado':sess.logado});
	});

	app.post('/reclamacaoCadastrar',(req,res) => {
		var sess = req.session;
		sess.logado;
		var dados = req.body;
		var conexao = app.infra.conexao();
		var bancoReclamacao = new app.infra.bancoReclamacao(conexao);
		bancoReclamacao.salva(dados, (erro,resposta) => {
			if (erro) {
				console.log(erro);
				res.render('cadastrarReclamacao.ejs');
			}else{
				bancoReclamacao.buscaGeral( (erro,resposta) => {
					if (erro) {
						console.log(erro);
					}else{
						console.log(resposta);
						res.render('reclamacoes.ejs',{'busca':resposta,'logado':sess.logado});
					}
				});
			}
			console.log("Reclamado com sucesso");
			console.log(dados);
		});
	});

	app.get('/reclamacao', (req,res) => {
		var sess = req.session;
		sess.logado;
		var conexao = app.infra.conexao();
		var bancoReclamacao = new app.infra.bancoReclamacao(conexao);
		bancoReclamacao.buscaGeral( (erro,resposta) => {
			if (erro) {
				console.log(erro);
			}else{
				console.log(resposta);
				res.render('reclamacoes.ejs',{'busca':resposta,'logado':sess.logado});
			}
		});
	});

	//Fim reclamações

}