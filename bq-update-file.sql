delete from highscores where id = 235;
select * from highscores;

insert into parts (win, lose1, lose2, lose3) values (
	"Reverb Stealth Barb Connector", "STI Brake Cable Basket", "Sram Barb", "Spokey Dokey"
);
select * from parts order by id desc;

insert into photos (part_id, filename) values (	35, "PXL_20210928_181413837" );

select win, part_id, filename from photos join parts on parts.id where photos.part_id = parts.id;