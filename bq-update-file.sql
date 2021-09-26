delete from highscores where id = 235;
select * from highscores;

insert into parts (win, lose1, lose2, lose3) values (
	"Rear Derailleur Pivot Cover", "Flight Deck Cover", "Chain Stay Spoke Holder", "Di2 Wire Holder"
);
select * from parts;

insert into photos (part_id, filename) values (	15, "PXL_20210923_163511452" );

select win, part_id, filename from photos join parts on parts.id where photos.part_id = parts.id;