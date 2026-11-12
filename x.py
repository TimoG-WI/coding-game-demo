
energie = 0
pins = [12, 7, 19, 4]

for p in pins:
    if p > 10:
        energie = energie + p
if energie == 31:
    print('TRESOR OFFEN!')
