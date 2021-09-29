INSERT INTO dbo.Vakcine (Naziv, AmbulantaID) 
SELECT 'Pfizer', ID FROM dbo.Ambulante;

INSERT INTO dbo.Vakcine (Naziv, AmbulantaID) 
SELECT 'Sinofarm', ID FROM dbo.Ambulante;

INSERT INTO dbo.Vakcine (Naziv, AmbulantaID) 
SELECT 'AstraZeneka', ID FROM dbo.Ambulante WHERE ID % 2 = 0;

INSERT INTO dbo.Vakcine (Naziv, AmbulantaID) 
SELECT 'Sputnjik', ID FROM dbo.Ambulante WHERE ID % 2 = 1;

INSERT INTO dbo.Vakcine (Naziv, AmbulantaID) 
SELECT 'Moderna', ID FROM dbo.Ambulante WHERE ID % 3 = 0;