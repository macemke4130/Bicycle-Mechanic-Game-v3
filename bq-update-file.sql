delete from highscores where id = 1175;
select * from highscores order by totalscore desc limit 10;

insert into parts (win, lose1, lose2, lose3) values (
	"Magura Olive", "Tektro Olive", "Hayes Olive", "Hope Olive"
);
select * from parts order by id desc;

insert into photos (part_id, filename) values (	175, "PXL_20210928_165747661" );

select photos.id, win, part_id, filename from photos join parts on parts.id where photos.part_id = parts.id order by part_id desc;
select * from photos order by id desc;

create table stats (
	id int primary key auto_increment not null,
    won bool,
    selectionlost bool,
    timeoverlost bool,
    correctanswers int,
    totalscore int,
    answerspeed decimal(5,2),
    gametimelength int,
    mouseoverevents int,
    datetimeplayed datetime default now()
);

alter table stats add column browser varchar(64) after mobile;

select * from stats order by id desc;

create table users (
	id int primary key auto_increment not null,
    user varchar(32),
    password varchar(32),
    admin bool
);

insert into users (user, password, admin) values ("", "", 1);
select * from users;