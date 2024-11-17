export const levenshtein = (a: string, b: string): number => {
	const matrix: number[][] = []

	// Инициализация матрицы
	for (let i = 0; i <= b.length; i++) {
		matrix[i] = [i]
	}
	for (let j = 0; j <= a.length; j++) {
		matrix[0][j] = j
	}

	// Вычисление расстояний
	for (let i = 1; i <= b.length; i++) {
		for (let j = 1; j <= a.length; j++) {
			if (b.charAt(i - 1) === a.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1]
			} else {
				matrix[i][j] = Math.min(
					matrix[i - 1][j - 1] + 1, // замена
					Math.min(
						matrix[i][j - 1] + 1, // вставка
						matrix[i - 1][j] + 1 // удаление
					)
				)
			}
		}
	}

	return matrix[b.length][a.length]
}
