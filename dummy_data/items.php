<?php
if (!defined("ABSPATH")) {
    exit();
}
$items = [
    0 => [
        'name' => 'AC window unit',
        'price' => '20',
    ],
    1 => [
        'name' => 'Area Rug (> 6\'x9\')',
        'price' => '35',
    ],
    2 => [
        'name' => 'Area Rug (<= 6\'x9\')',
        'price' => '20',
    ],
    3 => [
        'name' => 'Artificial Christmas Tree (10ft or less)',
        'price' => '20',
    ],
    4 => [
        'name' => 'Basketball Hoop (unattached to the ground)',
        'price' => '35',
    ],
    5 => [
        'name' => 'BBQ Grill',
        'price' => '40',
    ],
    6 => [
        'name' => 'Bedframe',
        'price' => '25',
    ],
    7 => [
        'name' => 'Bicycle (motorized)',
        'price' => '290',
    ],
    8 => [
        'name' => 'Bicycle (non-motorized)',
        'price' => '15',
    ],
    9 => [
        'name' => 'Bookcase',
        'price' => '30',
    ],
    10 => [
        'name' => 'Boxspring',
        'price' => '15',
    ],
    11 => [
        'name' => 'Cabinet',
        'price' => '30',
    ],
    12 => [
        'name' => 'Cardboard (flattened)',
        'price' => '2',
    ],
    13 => [
        'name' => 'Cat Tree',
        'price' => '20',
    ],
    14 => [
        'name' => 'Cardboard (unflattened)',
        'price' => '3',
    ],
    15 => [
        'name' => 'Chair (plastic)',
        'price' => '10',
    ],
    16 => [
        'name' => 'Chair (non-plastic)',
        'price' => '15',
    ],
    17 => [
        'name' => 'Computer Monitor',
        'price' => '20',
    ],
    18 => [
        'name' => 'Couch (2 seater/Love seat)',
        'price' => '25',
    ],
    19 => [
        'name' => 'Couch (3 seater)',
        'price' => '35',
    ],
    20 => [
        'name' => 'Couch (4 seater)',
        'price' => '45',
    ],
    21 => [
        'name' => 'Couch (Sectional couch - per individual piece)',
        'price' => '65',
    ],
    22 => [
        'name' => 'Desk (large)',
        'price' => '65',
    ],
    23 => [
        'name' => 'Desk (medium)',
        'price' => '30',
    ],
    24 => [
        'name' => 'Desk (small)',
        'price' => '20',
    ],
    25 => [
        'name' => 'Dishwasher',
        'price' => '25',
    ],
    26 => [
        'name' => 'Door (Double/French door - Exterior)',
        'price' => '130',
    ],
    27 => [
        'name' => 'Door (Double/French door - Interior',
        'price' => '80',
    ],
    28 => [
        'name' => 'Door (Single door - Exterior)',
        'price' => '65',
    ],
    29 => [
        'name' => 'Door (Single door - Interior)',
        'price' => '40',
    ],
    30 => [
        'name' => 'Dresser',
        'price' => '30',
    ],
    31 => [
        'name' => 'Electric Fan',
        'price' => '15',
    ],
    32 => [
        'name' => 'Entertainment center (Large)',
        'price' => '55',
    ],
    33 => [
        'name' => 'Entertainment center (Small)',
        'price' => '25',
    ],
    34 => [
        'name' => 'Floor Lamp',
        'price' => '15',
    ],
    35 => [
        'name' => 'Freezer (Must be empty)',
        'price' => '40',
    ],
    36 => [
        'name' => 'Fridge (Commerical-size - Must be empty)',
        'price' => '260',
    ],
    37 => [
        'name' => 'Fridge (Full-size - Must be empty)',
        'price' => '55',
    ],
    38 => [
        'name' => 'Fridge (Mini - Must be empty)',
        'price' => '20',
    ],
    39 => [
        'name' => 'Futon',
        'price' => '40',
    ],
    40 => [
        'name' => 'Headboard',
        'price' => '10',
    ],
    41 => [
        'name' => 'Headboard (Large)',
        'price' => '50',
    ],
    42 => [
        'name' => 'Hot tub',
        'price' => '550',
    ],
    43 => [
        'name' => 'Ironing Board',
        'price' => '15',
    ],
    44 => [
        'name' => 'Lawn mower',
        'price' => '35',
    ],
    45 => [
        'name' => 'Mattress',
        'price' => '25',
    ],
    46 => [
        'name' => 'Mattress topper',
        'price' => '15',
    ],
    47 => [
        'name' => 'Microwave',
        'price' => '10',
    ],
    48 => [
        'name' => 'Mirror',
        'price' => '20',
    ],
    49 => [
        'name' => 'Miscellaneous Small Items (Small sized home decor, small sized electronics, small sized toys, etc)',
        'price' => '10',
    ],
    50 => [
        'name' => 'Nightstand',
        'price' => '15',
    ],
    51 => [
        'name' => 'Ottoman',
        'price' => '15',
    ],
    52 => [
        'name' => 'Outdoor Umbrella',
        'price' => '20',
    ],
    53 => [
        'name' => 'Oven',
        'price' => '30',
    ],
    54 => [
        'name' => 'Piano',
        'price' => '350',
    ],
    55 => [
        'name' => 'Planter Pot',
        'price' => '15',
    ],
    56 => [
        'name' => 'Pool Table or commercial game room table',
        'price' => '340',
    ],
    57 => [
        'name' => 'Printer (Floor-standing)',
        'price' => '90',
    ],
    58 => [
        'name' => 'Printer (Small)',
        'price' => '10',
    ],
    59 => [
        'name' => 'Recliner Chair',
        'price' => '20',
    ],
    60 => [
        'name' => 'Satellite Dish (<36 inches wide)',
        'price' => '40',
    ],
    61 => [
        'name' => 'Sink',
        'price' => '20',
    ],
    62 => [
        'name' => 'Small-sized Ewaste',
        'price' => '10',
    ],
    63 => [
        'name' => 'Sofa',
        'price' => '30',
    ],
    64 => [
        'name' => 'Sofa Bed',
        'price' => '60',
    ],
    65 => [
        'name' => 'Sofa chair',
        'price' => '15',
    ],
    66 => [
        'name' => 'Stationary Bike',
        'price' => '40',
    ],
    67 => [
        'name' => 'Stereo',
        'price' => '20',
    ],
    68 => [
        'name' => 'Stove',
        'price' => '30',
    ],
    69 => [
        'name' => 'Styrofoam/other packing materials (per cubic yard)',
        'price' => '10',
    ],
    70 => [
        'name' => 'Surfboard',
        'price' => '20',
    ],
    71 => [
        'name' => 'Table',
        'price' => '30',
    ],
    72 => [
        'name' => 'Television',
        'price' => '30',
    ],
    73 => [
        'name' => 'Tire',
        'price' => '20',
    ],
    74 => [
        'name' => 'Toilet',
        'price' => '30',
    ],
    75 => [
        'name' => 'Trampoline',
        'price' => '100',
    ],
    76 => [
        'name' => 'Trash Bag (13 Gallons)',
        'price' => '7',
    ],
    77 => [
        'name' => 'Trash Bag (20 Gallons',
        'price' => '20',
    ],
    78 => [
        'name' => 'Trash Bag (30 Gallons)',
        'price' => '25',
    ],
    79 => [
        'name' => 'Trash Bin (35 Gallons)',
        'price' => '30',
    ],
    80 => [
        'name' => 'Trash Bin (65 Gallons)',
        'price' => '45',
    ],
    81 => [
        'name' => 'Trash Bin (95 Gallons)',
        'price' => '60',
    ],
    82 => [
        'name' => 'Treadmill',
        'price' => '85',
    ],
    83 => [
        'name' => 'Unlisted (send us a picture, additional fees may apply)',
        'price' => '0',
    ],
    84 => [
        'name' => 'Vacuum',
        'price' => '10',
    ],
    85 => [
        'name' => 'Vanity Desk (Large)',
        'price' => '65',
    ],
    86 => [
        'name' => 'Vanity Desk (Medium)',
        'price' => '30',
    ],
    87 => [
        'name' => 'Vanity Desk (Small)',
        'price' => '20',
    ],
    88 => [
        'name' => 'Washer/Dryer',
        'price' => '25',
    ],
    89 => [
        'name' => 'Wheelchair (Motorized)',
        'price' => '230',
    ],
    90 => [
        'name' => 'Wheelchair (Non Motorized)',
        'price' => '25',
    ],
    91 => [
        'name' => 'Wooden Pallet',
        'price' => '3',
    ],
    92 => [
        'name' => 'Yard Debris (per cubic yard)',
        'price' => '50',
    ],
    93 => [
        'name' => 'Heater (Small)',
        'price' => '30',
    ],
    94 => [
        'name' => 'Heater (Medium)',
        'price' => '50',
    ],
    95 => [
        'name' => 'Heater (Large)',
        'price' => '75',
    ],
    96 => [
        'name' => 'Bath Tub (Porcelain/Fiberglass)',
        'price' => '200',
    ],
    97 => [
        'name' => 'Bath Tub (Cast Iron)',
        'price' => '330',
    ],
    98 => [
        'name' => '5 Yard Dumpster',
        'price' => '262.50',
    ],
    99 => [
        'name' => '10 Yard Dumpster',
        'price' => '420',
    ],
    100 => [
        'name' => '20 Yard Dumpster',
        'price' => '551.25',
    ],
    101 => [
        'name' => '30 Yard Dumpster',
        'price' => '735',
    ],
    102 => [
        'name' => '40 Yard Dumpster',
        'price' => '840',
    ],
];
