delete from highscores where id = 235;
select * from highscores;

insert into parts (win, lose1, lose2, lose3) values (
	"Sram Olive", "Hayes Olive", "Magura Olive", "Tektro Olive"
);
select * from parts order by id desc limit 1;

insert into photos (part_id, filename) values (	135, "PXL_20210928_170418814" );

select photos.id, win, part_id, filename from photos join parts on parts.id where photos.part_id = parts.id order by part_id desc limit 2;