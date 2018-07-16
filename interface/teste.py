accidents2016 = [ 3834, 2966, 3548, 2162, 5 ];
accidents2015 = [ 6066, 4272, 5734, 3108, 3 ];
accidents2014 = [ 5476, 4050, 5010, 2666, 1 ];
accidents2013 = [ 6415, 4681, 6478, 3217, 8 ];
accidents2012 = [ 6177, 4571, 5929, 3516, 9 ];
accidents2011 = [ 6908, 5077, 7353, 4216, 25 ];
accidents2010 = [ 6177, 4571, 5929, 3516, 9 ];
accidents2009 = [ 6783, 4656, 6804, 3865, 19 ];
accidents2008 = [ 7130, 4470, 6869, 3803, 17 ];
accidents2007 = [ 6867, 4458, 7066, 3828, 25 ]; 

acc = [accidents2016, accidents2015, accidents2014, accidents2013, accidents2012, accidents2011, accidents2010, accidents2009, accidents2008, accidents2007]
acc.reverse()
teste = []

for i in range(len(accidents2016)):
        for j in range(len(acc)):
                teste.append(acc[j][i])
        print(teste)
        teste = []