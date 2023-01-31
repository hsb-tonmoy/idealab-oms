export function convertPrintType(print: string) {
	switch (print) {
		case 'pla':
			return 'PLA Print';
		case 'resin':
			return 'Resin Print';
		case 'laser-engraving':
			return 'Laser Engraving';
		case 'wood-carving':
			return 'Wood Carving';
		default:
			return 'PLA Print';
	}
}
