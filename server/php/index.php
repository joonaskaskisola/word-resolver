<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type');

$data = simplexml_load_string(file_get_contents('https://raw.githubusercontent.com/joonaskaskisola/word-resolver/master/kotus-sanalista/kotus-sanalista_v1.xml'));
$requestBody = json_decode(file_get_contents("php://input"), true);

if ($requestBody === null) {
	die();
}

$letters = array_key_exists('letters', $requestBody)
	? mb_strtolower($requestBody['letters'])
	: null;

$length = array_key_exists('length', $requestBody)
	? $requestBody['length']
	: null;

/**
 * Set the search parameters
 */
$search = [
	'length' => $length ? intval($length) : mb_strlen($letters),
	'letters' => array_reduce(preg_split('//u', $letters, null, PREG_SPLIT_NO_EMPTY), function (array $carry, string $letter): array {
		switch (array_key_exists($letter, $carry)) {
			case true:
				$carry[$letter]++;
				break;
			default:
				$carry[$letter] = 1;
				break;
		}

		return $carry;
	}, [])
];

/**
 * Read words from kotus
 */
$sanat = array_map(function (array $children): array {
	return array_map(function (SimpleXMLElement $el): string {
		$a = (array)$el;
		return mb_strtolower($a['s']);
	}, (array)$children);
}, (array)$data->children());

/**
 * Find words, with exact same match
 */
$matchingSizes = array_values(array_unique(array_reduce(array_shift($sanat), function (array $carry, string $sana) use ($search): array {
	if (mb_strlen($sana) === $search['length']) {
		$carry[] = $sana;
	}

	return $carry;
}, [])));

/**
 * Get exact matches
 */
$matches = array_reduce($matchingSizes, function (array $carry, string $sana) use ($search): array {
	$i = 0;

	foreach ($search['letters'] as $letter => $count) {
		switch (mb_substr_count($sana, $letter)) {
			case $count:
				$i += $count;
				break;
			case 0:
				break;
			default:
				$i--;
				break;
		}
	}

	if ($i === $search['length']) {
		$carry[] = $sana;
	}

	return $carry;
}, []);

echo json_encode(['matches' => $matches]);
