drop database if exists emarket;
create database emarket;
use emarket;

create table cliente(
id_cliente int not null auto_increment primary key,
cliente varchar(100),
cpf_cliente varchar(14) unique,
tel_cliente varchar(100),
email_cliente varchar(100) unique,
senha_cliente varchar(45)
);

create table mercado(
id_mercado int not null auto_increment primary key,
cnpj_mercado varchar(32),
email_mercado varchar(100) unique,
senha_mercado varchar(100),
mercado varchar(32)
);

create table produto(
id_produto int not null auto_increment primary key,
tipo_produto varchar(100),
produto varchar(100),
lote_produto varchar(14) unique,
mercado varchar(100),
valor_produto decimal(4,2)
);

create table adm(
id_adm int not null auto_increment primary key,
adm varchar(100),
email_adm varchar(100) unique,
senha_adm varchar(45)
);

create table reclamacao(
id_reclamacao int not null auto_increment primary key,
autor varchar(100),
titulo varchar(100),
reclamacao varchar(1000),
data_reclamacao date
);

insert into reclamacao (autor, titulo, reclamacao, data_reclamacao) values ("Caio", "Gerar lista", "Essa merda não funcionou, coloquei mais de dois itens e não foi mas quando coloquei apenas um foi.", '2019/11/05');

create table lista(
id_lista int not null auto_increment primary key,
id_produto int,
produto varchar(100),
id_cliente int,
cliente varchar(100),
id_mercado int,
mercado varchar(100),
id_adm int,
adm varchar(100),
tipo_lista varchar(100),
foreign key (id_cliente) references cliente(id_cliente),
foreign key (id_mercado) references mercado(id_mercado),
foreign key (id_produto) references produto(id_produto),
foreign key (id_adm) references adm(id_adm)
);

delimiter $$

drop procedure if exists inserir_cliente $$
create procedure inserir_cliente(
        in
cliente varchar(100),
cpf_cliente varchar(14),
tel_cliente varchar(100),
email_cliente varchar(100),
senha_cliente varchar(45)

)
BEGIN
insert into cliente (cliente, cpf_cliente, tel_cliente,email_cliente,senha_cliente) values (cliente, cpf_cliente, tel_cliente,email_cliente,md5(senha_cliente));
end $$
    
delimiter ;
call inserir_cliente("Denise","43450358545","48963217","de@gmail.com","12345678");

select*from cliente;

delimiter $$

drop procedure if exists buscar_cliente $$
create procedure buscar_cliente(
in
cliente varchar(100)
)
BEGIN
if (cliente="") then
select "Digite o nome do cliente";
else
select *from cliente where cliente=cliente;
end if;
end $$

delimiter ;

call buscar_cliente("Denise");

delimiter $$

drop procedure if exists alterar_cliente $$
create procedure alterar_cliente(
in
IM_id_cliente int,
IM_cliente varchar(100),
IM_tel_cliente varchar(100),
IM_senha_cliente varchar(45)
)
BEGIN
if (IM_id_cliente="") then
select "Digite o id do cliente";
else
update cliente set cliente=IM_cliente,tel_cliente=IM_tel_cliente, senha_cliente=md5(IM_senha_cliente) where id_cliente=IM_id_cliente;
end if;
end $$
delimiter ;

call alterar_cliente(1,"Denise", "9632568741", "123");


delimiter $$
drop procedure if exists excluir_cliente $$
create procedure excluir_cliente(
in
IM_id_cliente int 
)
BEGIN
if (IM_id_cliente="") then
select "Digitie o nome do cliente";
else 
delete from cliente where id_cliente=IM_id_cliente;
end if;
end $$
delimiter ;

call excluir_cliente (1);

delimiter $$
drop procedure if exists inserir_mercado $$
create procedure inserir_mercado(
in
mercado varchar(100),
cnpj_mercado varchar(32),
email_mercado varchar(100),
senha_mercado varchar(45) 
)
BEGIN
insert into mercado (mercado, cnpj_mercado, email_mercado, senha_mercado) values (mercado, cnpj_mercado, email_mercado, md5(senha_mercado));
end $$
    
delimiter ;

call inserir_mercado("Vencedor","3265484154","vencedor@gmail.com","12345678");

select*from mercado;


delimiter $$

drop procedure if exists alterar_mercado $$
create procedure alterar_mercado(
in
IM_id_mercado int,
IM_mercado varchar(100),
IM_cnpj_mercado varchar(32),
IM_senha_mercado varchar(45) 
)
BEGIN
if (IM_id_mercado="") then
select "Digite o id do mercado";
else
update mercado set mercado=IM_mercado,cnpj_mercado=IM_cnpj_mercado, senha_mercado=IM_senha_mercado  where id_mercado=IM_id_mercado;
end if;
end $$
delimiter ;

call alterar_mercado(1,"San","3265484154","12345678");

delimiter $$
drop procedure if exists excluir_mercado$$
create procedure excluir_mercado(
in
IM_id_mercado int 
)
BEGIN
if (IM_id_mercado="") then
select "Digite o nome do mercado";
else 
delete from mercado where id_mercado=IM_id_mercado;
end if;
end $$
delimiter ;
call excluir_mercado (1);

delimiter $$
drop procedure if exists inserir_produto $$
create procedure inserir_produto(
in
tipo_produto varchar(32),
produto varchar(100),
lote_produto varchar(14),
mercado varchar(100),
valor_produto decimal(4,2)
)

BEGIN
insert into produto (tipo_produto,produto, lote_produto, mercado, valor_produto) values (tipo_produto,produto, lote_produto, mercado, valor_produto);
end $$
delimiter ;

call inserir_produto("Alimento","Batata","123","San","3.1");

select*from produto;

select p.id_produto, p.tipo_produto, p.lote_produto, p.produto, p.mercado, p.valor_produto, consulta1.menor  from produto p INNER JOIN (select produto, MIN(valor_produto) as menor from produto c group by produto) as consulta1 ON p.valor_produto = consulta1.menor where p.produto = "Batata";

delimiter $$
drop procedure if exists excluir_produto$$
create procedure excluir_produto(
in
IM_id_produto int 
)
BEGIN
if (IM_id_produto="") then
select "Digite o nome do produto";
else 
delete from produto where id_produto=IM_id_produto;
end if;
end $$
delimiter ;

call excluir_produto(13);
call excluir_produto(14);
call excluir_produto(15);

delimiter $$

drop procedure if exists alterar_produto $$
create procedure alterar_produto(
in
IM_id_produto int,
IM_tipo_produto varchar(32),
IM_produto varchar(100),
IM_lote_produto varchar(14),
IM_mercado varchar (100),
IM_valor_produto decimal(4,2)
)
BEGIN
if (IM_id_produto="") then
select "Digite o id do Produto";
else
update produto set tipo_produto=IM_tipo_produto,produto=IM_produto, lote_produto=IM_lote_produto,mercado=IM_mercado,valor_produto=IM_valor_produto where id_produto=IM_id_produto;

end if;
end $$
delimiter ;

call alterar_produto (1,"alimento","batata","25693148","San","4");

delimiter $$

drop procedure if exists inserir_adm $$
create procedure inserir_adm(
        in
adm varchar(100),
email_adm varchar(100),
senha_adm varchar(45) 
)
BEGIN
insert into adm (adm, email_adm, senha_adm) values (adm, email_adm, md5(senha_adm));
end $$
delimiter ;

call inserir_adm("eMarket","emarket_adm@gmail.com","emarket2019");

select*from adm;

delimiter $$

drop procedure if exists alterar_adm $$
create procedure alterar_adm(
in
IM_id_adm int,
IM_adm varchar(32),
IM_senha_adm varchar(45)
)
BEGIN
if (IM_id_adm="") then
select "Digite o id do Produto";
else
update adm set adm=IM_adm, senha_adm=md5(IM_senha_adm) where id_adm=IM_id_adm;

end if;
end $$
delimiter ;

call alterar_adm (1,"Caio Zanqueta","Batata123");

delimiter $$
drop procedure if exists excluir_adm $$
create procedure excluir_adm(
in
IM_id_adm int 
)
BEGIN
if (IM_id_adm="") then
select "Digite o nome do adm";
else 
delete from adm where id_adm=IM_id_adm;
end if;
end $$
delimiter ;

call excluir_adm(1);


