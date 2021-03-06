<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'user_id', 'user_book_id', 'title', 'body', 'published_at',
    ];

    /**
     *リレーション定義
     */
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function userBook(){
        return $this->belongsTo(UserBook::class, 'user_book_id');
    }


    /**
     * Query scope
     */

    public function scopePublished($query){
        return $query->whereNotNull('published_at');
    }
}
